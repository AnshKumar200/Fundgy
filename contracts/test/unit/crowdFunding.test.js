const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("CrowdFunding unit test", function () {
          let deployer,
              crowdFunding,
              owner,
              title,
              description,
              target,
              f_deadline,
              s_deadline,
              image,
              category,
              mockV3Aggregator
          const targetNumber = ethers.utils.parseUnits("1000000000000000000", 18)

          beforeEach(async function () {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              crowdFunding = await ethers.getContract("CrowdFunding", deployer)
              owner = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955"
              title = "My Campaign"
              description = "This is my campaign description."
              target = targetNumber
              image = "https://picsum.photos/id/45/600/400"
              category = "Arts"
              s_deadline = 1701388800000 - 1 // 2023-12-01T23:59:59Z
              f_deadline = 1653569600 - 1 // 2023-05-23T23:59:59Z
              mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
          })

          describe("constructor", function () {
              it("Sets the aggregator address correctly", async function () {
                  const response = await crowdFunding.getPriceFeed()
                  const price = await crowdFunding.getConvertedPrice()
                  assert.equal(response, mockV3Aggregator.address)
              })
          })

          describe("createCampaign", function () {
              it("create campaign successfully and increment the number of numberOfCampaigns", async function () {
                  await crowdFunding.createCampaign(
                      owner,
                      title,
                      description,
                      target,
                      s_deadline,
                      image,
                      category
                  )

                  const numberOfCampaigns = await crowdFunding.getNumberOfCampaigns()
                  assert.equal(parseInt(numberOfCampaigns), 1)
              })

              it("reverted with error if deadline is less than current time", async function () {
                  await expect(
                      crowdFunding.createCampaign(
                          owner,
                          title,
                          description,
                          target,
                          f_deadline,
                          image,
                          category
                      )
                  ).to.be.revertedWith("CrowdFunding__DeadLineIsAlreadyPassed")
              })
          })

          describe("donateToCampaign ", function () {
              it("should add a donor and donation to the campaign", async function () {
                  const amount = ethers.utils.parseEther("1")
                  await crowdFunding.donateToCampaign(1, { value: amount })
                  const donators = await crowdFunding.getDonators(1)
                  assert(donators[0])
                  assert(donators[1])
              })
              it("reverted if there is an error in transaction", async function () {
                  const amount = ethers.utils.parseEther("0")
                  await expect(
                      crowdFunding.donateToCampaign(1, { value: amount })
                  ).to.be.revertedWith("CrowdFunding__TransferFailed")
              })
          })

          describe("getCampaigns", function () {
              beforeEach(async function () {
                  await crowdFunding.createCampaign(
                      owner,
                      title,
                      description,
                      target,
                      s_deadline,
                      image,
                      category
                  )
              })
              it("after creating campaign getCampaigns should return campaign details", async function () {
                  const gtcampaigns = await crowdFunding.getCampaigns()
                  assert.equal(gtcampaigns[0].owner, owner)
                  assert.equal(gtcampaigns[0].title, title)
                  assert.equal(gtcampaigns[0].description, description)
                  assert.equal(gtcampaigns[0].deadline, s_deadline)
                  assert.equal(gtcampaigns[0].image, image)
                  assert.equal(gtcampaigns[0].category, category)
              })
          })
      })

import SpotifyApi from "../src/resources/SpotifyApi"

describe("Spotify API", () => {
  let api
  let fetch

  beforeEach(() => {
    fetch = jest.fn()
    api = new SpotifyApi("my-secret-token", fetch)
  })

  it("processResponse should throw an error if response is null", () => {
    expect(() => {
      api.processResponse(null)
    }).toThrow()
  })

  it("processResponse should throw exception if status code is not OK", () => {
    expect(() => {
      api.processResponse({
        status: 400,
        statusText: "Some error"
      })
    }).toThrow()
  })

  it("processResponse should return correct response if status code is OK", () => {
    const validResponse = {
      status: 200,
      statusText: "OK",
      data: {}
    }
    response = api.processResponse(validResponse)
    expect(response).toEqual(validResponse)
  })

  it("fetch artist generates valid request params", () => {
    throw Error("Not implemented")
  })

  it("search artist generates valid request params", () => {
    throw Error("Not implemented")
  })
})

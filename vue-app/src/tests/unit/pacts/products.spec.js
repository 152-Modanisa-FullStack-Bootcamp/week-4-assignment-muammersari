import { pactWith } from "jest-pact";
import { Matchers } from "@pact-foundation/pact";
const { eachLike, like, integer } = Matchers;
import { API } from "@/api";

pactWith(
  {
    consumer: "Frontend",
    provider: "Backend",
  },
  (provider) => {
    describe("products", () => {
      let api;
      beforeEach(() => {
        api = new API(provider.mockService.baseUrl);
      });
      test("get product list", async () => {
        console.log(provider);
        await provider.addInteraction({
          state: "get product list successfully",
          uponReceiving: "a request not empty for product list",
          withRequest: {
            method: "GET",
            path: "/products",
          },
          willRespondWith: {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=UTF-8",
            },
            body: eachLike({
              id: integer(1),
              videoAdress: like("https://www.youtube.com/watch?v=FXpIoQ_rT_c"),
              coverImage: like(
                "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-cover.webp"
              ),
              hoverImage: like(
                "https://raw.githubusercontent.com/modanisa/bootcamp-video-db/main/video-images/1-hover.webp"
              ),
              title: like("Vue.js Course for Beginners [2021 Tutorial]"),
              viewCount: integer(254),
              publishDateInMonth: integer(4),
              ownerImage: like(
                "https://yt3.ggpht.com/ytc/AKedOLTtJvQ1Vfew91vemeLaLdhjOwGx3tTBLlreK_QUyA=s68-c-k-c0x00ffffff-no-rj"
              ),
              ownerName: integer("reeCodeCamp.org"),
              description: like(
                "Learn Vue 3 by in this full course. Vue.js is an open-source model–view–view model front end JavaScript framework for building user interfaces and single-page applications."
              ),
            }),
          },
        });
        const res = await api.getProductList();
        expect(res[0].id).toEqual(1);
        expect(res[0].viewCount).toEqual(254);
      });
    });
  }
);

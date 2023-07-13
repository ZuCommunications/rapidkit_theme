import { Carousel } from "flowbite";
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["indicator", "item", "prev", "next"];
  connect() {
    const items = this.itemTargets.map((el, i) => ({
      el,
      position: i,
    }));
    const indicators = this.indicatorTargets.map((el, i) => ({
      el,
      position: i,
    }));

    const options = {
      defaultPosition: 0,
      interval: 3000,

      indicators: {
        activeClasses: "bg-blue-700",
        inactiveClasses: "bg-white",
        items: indicators,
      },

      // callback functions
      onNext: () => {
        console.log("next slider item is shown");
      },
      onPrev: () => {
        console.log("previous slider item is shown");
      },
      onChange: () => {
        console.log("new slider item has been shown");
      },
    };

    const carousel = new Carousel(items, options);

    this.prevTarget.addEventListener("click", () => {
      carousel.prev();
    });

    this.nextTarget.addEventListener("click", () => {
      carousel.next();
    });
  }
}

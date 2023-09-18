import { Controller } from "@hotwired/stimulus";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./carousel.css";

export default class extends Controller {
  static targets = ["prev", "next", "pagination"];
  connect() {
    return new Swiper(".swiper", {
      loop: true,
      autoHeight: true,
      modules: [Navigation, Pagination],
      speed: 500,
      navigation: {
        nextEl: this.nextTarget,
        prevEl: this.prevTarget,
      },
      pagination: {
        el: this.paginationTarget,
      },
    });
  }
}

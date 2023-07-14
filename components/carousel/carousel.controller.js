import { Controller } from "@hotwired/stimulus";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default class extends Controller {
  static targets = ["prev", "next", "pagination"];
  connect() {
    const swiper = new Swiper(".swiper", {
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
        bulletClass:
          "swiper-pagination-bullet !block !w-3 !h-3 !rounded-full !bg-white !border-2 !border-white !opacity-100",
        bulletActiveClass:
          "swiper-pagination-bullet-active !bg-transparent !border-transparent",
      },
    });
  }
}

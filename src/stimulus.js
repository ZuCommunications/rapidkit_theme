import { Application } from "@hotwired/stimulus";
import CarouselController from "../components/carousel/carousel.controller";
window.Stimulus = Application.start();
window.Stimulus.register("carousel", CarouselController);

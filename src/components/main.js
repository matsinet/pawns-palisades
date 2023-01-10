import html from "html-literal";
import { header, footer, sidebar } from "./";

export default (view, state = {}) => {
  return html`${header.render(state)}
    <div id="main-wrapper" class="columns">
      <!--<div class="col s3 m2 l2 xl1 sidebar" v-if="rootStore.showSidebar">-->
      <div class="column is-narrow">
        ${sidebar.render(state)}
      </div>
      <div class="column mt-3 mr-3">
        ${view.render(state)}
      </div>
    </div>`;
};
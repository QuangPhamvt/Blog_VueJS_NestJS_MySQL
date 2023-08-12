import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import store from "./store"
import { library } from "@fortawesome/fontawesome-svg-core"

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

import { faUserSecret } from "@fortawesome/free-solid-svg-icons"
import {
	faFacebook,
	faInstagram,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons"

/* add icons to the library */
library.add(faUserSecret, faTwitter, faInstagram, faFacebook)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(store)
app.component("font-awesome-icon", FontAwesomeIcon)
app.directive("theme", (el, binding) => {
	if (binding.value.isFocus) el.style.backgroundColor = binding.value.colorFocus
	else el.style.backgroundColor = binding.value.colorNotFocus
})

app.mount("#app")

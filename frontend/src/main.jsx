import {createRoot} from "react-dom/client"
import ProductApp from "./ProductApp"
import {Toaster} from "react-hot-toast"
import "./index.css"
createRoot(document.getElementById("root")).render(
<>    <ProductApp/>
<Toaster/>
</>
)
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ROUTES } from "./routes/routes";
import { ProductContextProvider } from "./context/ProductContext";

const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <ProductContextProvider>
      <RouterProvider router={routes}/>
    </ProductContextProvider>
  );
}

export default App;
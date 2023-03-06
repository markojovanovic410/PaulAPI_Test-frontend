import Header from "../components/header/header";
import { Container } from "react-bootstrap";
const Layout = ({children}) => {
  return (
    <div className="App-Body">
    <Header />
    <hr style={{height:"1px", margin:"0px"}}/>
        {children}
    </div>
  )
};

export default Layout;
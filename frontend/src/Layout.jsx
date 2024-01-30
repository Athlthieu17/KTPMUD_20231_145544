import Header from "./components/Header";

const  MainLayout = ({children, isShowAction}) =>{
    return (
        <div>
        <Header isShowAction={isShowAction}/>
        {children}
        </div>
    )
}

export default MainLayout;
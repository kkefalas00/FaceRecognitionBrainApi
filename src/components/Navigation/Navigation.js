import React from "react";

const Navigation = ({onRouteChange, isSignedIn}) => {
    
    if (isSignedIn){
        return (
            <nav style= {{display:"flex", justifyContent:"flex-end"}}>
                <p onClick={()=>onRouteChange("profile")}  className="f3 link dim black underline pa3 pointer">Profile</p>
                <p onClick={()=>onRouteChange("signout")} className="f3 link dim black underline pa3 pointer">Sign Out</p>
            </nav>
        );
    }else{
        return (
            <div>
                <nav style= {{display:"flex", justifyContent:"flex-end"}}>
                    <p onClick={()=>onRouteChange("signIn")} className="f3 link dim black underline pa3 pointer">Sign In</p>
                    <p onClick={()=>onRouteChange("register")} className="f3 link dim black underline pa3 pointer">Register</p>
                </nav>
            </div>
        );
    }
    
}

export default Navigation;
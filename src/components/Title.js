import { useAuth } from "../context/AuthenticationProv";

function Title ({text}) {
    const {authData} = useAuth();
   
    return (
        <div className="title">
            {(authData.name) && <h2>{text}</h2> 
            }
</div>
    )
}
export default Title;
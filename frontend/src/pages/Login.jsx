const FormField = (prop) => {
    if (!prop.name || !prop.type)
        return null;
    
    let name_split, attr_id, attr_placeholder;
    name_split = prop.name.split(" ");
    attr_id = name_split.join("-");
    attr_placeholder = prop.name.split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
    
    return (
        <div class = "login-form-field-wrapper">
            <input type = {prop.type} id = {"login-form-" + attr_id} name = {attr_id} placeholder = {attr_placeholder} />
            {
                prop.logo ?  
                <div>asd</div> :
                <div>dsa</div>
            }
        </div>
    );
}

const LoginForm = () => {
    return (
        <div>
            annyeong
            <FormField />
            <FormField name = "username" type = "text" />
        </div>
    );
}

const Login = ()  => {
    return (<div><LoginForm /></div>);
}

export default Login;
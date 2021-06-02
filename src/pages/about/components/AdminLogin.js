import './AdminLogin.css';

export default function AdminLogin(props) {
    return (
        <section id="admin-login">
        <div onClick={props.showForm}>🤪😀🤪😀🤪😀🤪😀🤪</div>
        logged in: {props.loggedIn ? "true" : "false"}
        {  
          !props.showLogin && <><div className="login-grid">
          { [...new Array(9).keys()].map( (item, index) => {
            return <div key={index} onClick={props.keyPress}>{item + 1}</div>
          })}
          </div><div>{props.code}</div></>
        }
        {
          !props.loggedIn && props.showLogin && <form onSubmit={props.submitForm}><input type="password" name="login" /><input type="submit" /></form>
        }
        </section>
    )
}

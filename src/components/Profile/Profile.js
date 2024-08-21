import React from "react";

class Profile extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            entries: ""
        }
    }

    componentDidMount() {
        const { id } = this.props;
    
        if (id) {  // Ensure id is not undefined or empty
            fetch(`http://localhost:3000/profile/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(resp => resp.json())
            .then(user => {
                if (user) {
                    this.setState({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        entries: user.entries
                    });
                }
            })
            .catch(console.log);
        } else {
            console.log("No ID provided in props");
        }
    }
    render(){

        return(
            <article className="br3 ba black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Profile</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Image</label>
                            <img alt='robots' src={`https://robohash.org/${this.state.id}?20x20`}></img>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" value={this.state.name}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"value={this.state.email}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="entries">Entries</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="number" name="entries"  id="entries"value={this.state.entries}/>
                        </div>
                        </fieldset> 
                    </div>
                </main>
            </article>
        )     
    }
}
export default Profile;
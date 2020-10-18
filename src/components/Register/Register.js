import React from 'react';
function SignIn({onRouteChange}) {
  return (
    <div className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5" >
      <main className="pa4 black-80">
  <form className="measure ">
    <fieldset id="sign_up" class="ba b--transparent ph0 mh0">
      <legend className="f1 fw6 ph0 mh0">Register</legend>
      <div class="mt3">
        <label class="db fw6 lh-copy f6" for="email-address">Email</label>
        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div class="mv3">
        <label class="db fw6 lh-copy f6" for="password">Password</label>
        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
        </fieldset>
    <div className="">
      <input onClick={()=>onRouteChange('home')}className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register"/>
    </div>
    <div class="lh-copy mt3">
    <p onClick={()=>onRouteChange('SignIn')} class="f6 link dim black db pointer">SignIn</p>
    </div>
  </form>
</main>
    </div>
  );
}

export default SignIn;



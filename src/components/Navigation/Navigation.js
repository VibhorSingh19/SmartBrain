import React from 'react';

function Navigation({onRouteChange,isSignedIn}) {
 
 
    
    if (isSignedIn) {
      return (
      <nav>	
     <p onClick={()=>onRouteChange('SignIn')}className='f4 link dim black underline pa3 pointer fr pv0 mv0'>Sign Out</p>  
     </nav>
      );
     }
     else
     {
     return (
      <nav>	
    </nav>
      );
     }	
            
  

}
export default Navigation;

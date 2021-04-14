import React from "react";

import AlertMessage from "components/Base/AlertMessage"



function AlertWindow(props) {

    return (
       <div>
           <AlertMessage
               {...props}
           />
       </div>
    );
}

export default AlertWindow;


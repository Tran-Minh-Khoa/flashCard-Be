const resetPasswordForm = document.getElementById("resetPasswordForm")
const changePasswordWarning = document.getElementById("changePasswordWarning")

function passwordCheck(password){
    const properLength = password.length <= 20 && password.length >= 6
    const containCharacter = /[a-zA-Z]/.test(password)
    const containNumber = /\d/.test(password)
  
    if(!properLength){
      return {
        'result': 'fail',
        'message': 'Your new password\'s length must be between 6-20 characters'
      }
    }
    else if(!(containCharacter && containNumber)){
      return {
        'result': 'fail',
        'message': 'Your new password must contain both characters and numbers'
      }
    }
    else{
      return {
        'result': 'success'
      }
    }
  }

resetPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const new_password = resetPasswordForm.elements["new_password"].value
    const confirm_password = resetPasswordForm.elements["confirm_password"].value

    const checkNewPassword = passwordCheck(new_password)

    if(checkNewPassword.result === 'fail'){
        changePasswordWarning.style.display = "flex"
        changePasswordWarning.innerHTML = `
            <svg role="presentation" focusable="false" width="18" height="18" class="icon icon-warning" style="--icon-height: 18px" viewBox="0 0 18 18">
                <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
                <path d="M7.98347 10.156V4.504H9.99947V10.156H7.98347ZM10.1675 11.98C10.1675 12.14 10.1355 12.292 10.0715 12.436C10.0155 12.572 9.93147 12.692 9.81947 12.796C9.71547 12.892 9.59147 12.968 9.44747 13.024C9.30347 13.088 9.15147 13.12 8.99147 13.12C8.83147 13.12 8.67947 13.092 8.53547 13.036C8.39947 12.98 8.27947 12.9 8.17547 12.796C8.07147 12.692 7.98747 12.572 7.92347 12.436C7.85947 12.3 7.82747 12.152 7.82747 11.992C7.82747 11.84 7.85547 11.696 7.91147 11.56C7.97547 11.416 8.05947 11.292 8.16347 11.188C8.26747 11.084 8.39147 11.004 8.53547 10.948C8.67947 10.884 8.83147 10.852 8.99147 10.852C9.15147 10.852 9.30347 10.884 9.44747 10.948C9.59147 11.004 9.71547 11.084 9.81947 11.188C9.93147 11.284 10.0155 11.404 10.0715 11.548C10.1355 11.684 10.1675 11.828 10.1675 11.98Z" fill="#ffffff"></path>
            </svg>
            <span>${checkNewPassword.message}</span>
        `
        return
    }

    if(new_password !== confirm_password){
        changePasswordWarning.style.display = "flex"
        changePasswordWarning.innerHTML = `
            <svg role="presentation" focusable="false" width="18" height="18" class="icon icon-warning" style="--icon-height: 18px" viewBox="0 0 18 18">
                <path d="M0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18C4.02944 18 0 13.9706 0 9Z" fill="currentColor"></path>
                <path d="M7.98347 10.156V4.504H9.99947V10.156H7.98347ZM10.1675 11.98C10.1675 12.14 10.1355 12.292 10.0715 12.436C10.0155 12.572 9.93147 12.692 9.81947 12.796C9.71547 12.892 9.59147 12.968 9.44747 13.024C9.30347 13.088 9.15147 13.12 8.99147 13.12C8.83147 13.12 8.67947 13.092 8.53547 13.036C8.39947 12.98 8.27947 12.9 8.17547 12.796C8.07147 12.692 7.98747 12.572 7.92347 12.436C7.85947 12.3 7.82747 12.152 7.82747 11.992C7.82747 11.84 7.85547 11.696 7.91147 11.56C7.97547 11.416 8.05947 11.292 8.16347 11.188C8.26747 11.084 8.39147 11.004 8.53547 10.948C8.67947 10.884 8.83147 10.852 8.99147 10.852C9.15147 10.852 9.30347 10.884 9.44747 10.948C9.59147 11.004 9.71547 11.084 9.81947 11.188C9.93147 11.284 10.0155 11.404 10.0715 11.548C10.1355 11.684 10.1675 11.828 10.1675 11.98Z" fill="#ffffff"></path>
            </svg>
            <span>Your new password and confirm password are not the same</span>
        `
    }
    else{
        changePasswordWarning.style.display = "none"
        
       
        const currentURL = window.location.href;

        // Phân tích URL để lấy token
        const parts = currentURL.split('/');
        const token = parts[parts.length - 1];
        fetch("/login/reset-password", {
            method: "POST",
            body: JSON.stringify({
                token: token,
                newPassword: new_password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => {
            if(response.ok){
                window.location.href = response.url
            }
        })
    }
})
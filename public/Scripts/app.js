//const { event } = require("jquery");

(function(){

    function Start()
    {
        console.log("App Started...");

        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm('Are you sure?')) 
                {
                    event.preventDefault();
                    window.location.assign('/name-list');
                }
            });
        }
    }

    window.addEventListener("load", Start);

})();
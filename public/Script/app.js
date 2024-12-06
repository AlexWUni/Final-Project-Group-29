// immediately invoked function expression
// IIFI
(function(){
    function start(){
        console.log("Server Started");
        let deleteButtons = document.querySelectorAll('.btn-danger');
        for(button of deleteButtons)
            {
                button.addEventListener('click',(event)=>{
                    if(!confirm("Are you sure?"))
                    {
                        event.preventDefault();
                        window.location.assign('/incidentslist');
                    }
                });
            }
    }
    window.addEventListener("load",start);
})();
const nameInput = document.getElementById('name-input');
const numberInput = document.getElementById('number-input');
const mmInput = document.getElementById('mm-input');
const yyInput = document.getElementById('yy-input');
const cvcInput = document.getElementById('cvc-input');

const nameDisplay = document.getElementById('front-name');
const numberDisplay = document.getElementById('front-number');
const mmDisplay = document.getElementById('front-date-mm');
const yyDisplay = document.getElementById('front-date-yy');
const cvcDisplay = document.getElementById('back-cvc');

const nameError = document.getElementById('name-error');
const numberError = document.getElementById('number-error');
const mmError = document.getElementById('mm-error');
const yyError = document.getElementById('yy-error');
const cvcError = document.getElementById('cvc-error');

const form = document.getElementById('form');
const completeState = document.querySelector('.thank-state');
const resetForm = document.getElementById('reset-btn');

nameInput.addEventListener('input', ()=>{
    nameDisplay.textContent = nameInput.value;
    if(nameInput.value == ''){
        nameDisplay.textContent = 'Jane Appleseed';
    }
});

numberInput.addEventListener('input', (e)=>{
    numberInput.maxLength = 19;
    numberInput.minLength = 19;
    inpValue = e.target.value;
    numberDisplay.textContent = numberInput.value;
    numberInput.value = inpValue.replace(/\s/g, '').replace(/([A-z0-9|.]{4})/g, '$& ').trim();

    if(numberInput.value == ''){
        numberDisplay.textContent = '0000 0000 0000 0000';
    }

});

mmInput.addEventListener('input', (e) => {
    e.target.max = 12;
    e.target.min = 1;

    if (mmInput.value.length > 2) {
        mmInput.value = mmInput.value.slice(0,2);
    }

    mmDisplay.textContent = e.target.value;
    if(e.target.value == ''){
        mmDisplay.textContent = '00'
    }
});

yyInput.addEventListener('input', (e) => {
    e.target.max = 99;
    e.target.min = 0;

    if(yyInput.value.length > 2) {
        yyInput.value = yyInput.value.slice(0,2);
    }
    
    yyDisplay.textContent = e.target.value;
    if(e.target.value == ''){
        yyDisplay.textContent = '00'
    }
});

cvcInput.addEventListener('input', (e)=>{
    cvcInput.value.maxLength = 3;
    cvcInput.value.minLength = 3;
    e.target.max = 999;
    e.target.min = 0;
    if (cvcInput.value.length > 3) {
        cvcInput.value = cvcInput.value.slice(0,3);
    }

    cvcDisplay.textContent = e.target.value;
    if (e.target.value == '') {
        cvcDisplay.innerText = '000'
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const invalidBorder = "1px solid hsl(0, 100%, 66%)";
    const validBorder = "1px solid hsl(138, 100%, 62%)";
    const blank = "Can't be blank";

    const namePattern = /^[a-zA-Z]{2,}(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
    const cvcPattern = /[0-9]{3}/g;
    const mmPattern = /[0-9]{1,2}/g;
    const yyPattern = /[0-9]{2}/g;
    const numberPattern = /([0-9]{4})\s([0-9]{4})\s([0-9]{4})\s([0-9]{4})$/g;

    /** ERROR MSG */
    const display = (errorText,errorBorder,msg,border) =>{
        errorText.textContent = msg;
        errorBorder.style.border = border;
    }
    /** VALIDATE NAME */
    const validName = () => {
        if (!nameInput.value || nameInput.value.length < 2) {
            display(nameError, nameInput, blank, invalidBorder);
        }

        else if(!namePattern.test(nameInput.value)) {
            display(nameError, nameInput, "Wrong format, letters only!", invalidBorder)
        }

        else{
            display(nameError,nameInput, "", validBorder)
        }
    }
    /** VALIDATE NUMBER */
    const validNumber = () => {
        if (!numberInput.value || numberInput.value.length < 19) {
            display(numberError,numberInput, blank, invalidBorder);
        }
        else if (numberPattern.test(numberInput.value)){
            display(numberError,numberInput, "", validBorder)
        }
        else{
            display(numberError,numberInput, "Wrong format, numbers only!", invalidBorder)
        }
    }
    /** VALIDATE MM */
    const validMm = () =>{
        if (!mmInput.value || !mmPattern.test(mmInput.value))  {
            display(mmError,mmInput, blank, invalidBorder);
        }
        else{
            display(mmError,mmInput, "", validBorder)
        }
    }
    /** VALIDATE YY */
    const validYy = ()=>{
        if (!yyInput.value || !yyPattern.test(yyInput.value)) {
            display(yyError,yyInput, blank, invalidBorder);
        }
        else{
            display(yyError,yyInput, "", validBorder)
        }  
    }
    /** VALIDATE CVC */
    const validCvc = () =>{
        if (!cvcInput.value || !cvcPattern.test(cvcInput.value)) {
            display(cvcError,cvcInput, blank, invalidBorder);
        }
        else{
            display(cvcError,cvcInput, "", validBorder)
        }
    }
    /**VALIDATED COMPLETE STATE */
    const allValid = () => {
        if (nameError.textContent == "" &&
            numberError.textContent == "" &&
            mmError.textContent == "" &&
            yyError.textContent == "" &&
            cvcError.textContent == ""){
            form.classList.toggle("hidden");
            completeState.classList.toggle("hidden");
        }
    }

    function validateForm() {

        validName();
        validNumber();
        validMm();
        validYy();
        validCvc();
        allValid();
        
    }

    validateForm();

});

resetForm.addEventListener('click', () => {
    const resetInput = (input) =>{
        input.value = "";
        input.style.border = "";
    }
    resetInput(nameInput);
    resetInput(numberInput);
    resetInput(mmInput);
    resetInput(yyInput);
    resetInput(cvcInput);
    form.classList.toggle("hidden");
    completeState.classList.toggle("hidden");
});
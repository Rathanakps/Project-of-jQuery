function getUrl(){
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}
$(document).ready(() => {
    getApi();
    $('#select').on('change',()=> {
        var selectId = $('#select').val();
        eachRecipe(selectId);
    });

    $('#add').on('click', () => {
        getIncrement();
        var selectId = $('#select').val();
        var increment = $('#members').val();
        // console.log(increment);
        updateRecipe(selectId,increment);
    });
    $('#minus').on('click', () => {
        getDecrement();
        var selectId = $('#select').val();
        var decrement = $('#members').val();
        updateRecipes(selectId,decrement);
    })
})

// get api
function getApi(){
    $.ajax({
        dataType:'json',
        url:getUrl(),
        success: (data) => chooseRecipes(data.recipes),
        error: () => console.log("cannot recipes"),
    })
}

var allData = [];
// get recipe with select
var chooseRecipes = (myData) => {
    allData = myData;
    var option = "";
    myData.forEach(cipe => {
        option += `
            <option value="${cipe.id}">${cipe.name}</option>
        `;
    });
    $('#select').append(option);
    $('#show-rulers').hide();
    $('#text-ingredient').hide();
    $('#text-instruction').hide();
    $('#all-member').hide();
}

// var defaultGest = 1;
// get function to output
var eachRecipe = (ricipeId) => {
    // updateRecipe(ricipeId);
    allData.forEach(item => {
        if(item.id == ricipeId){
            showRecipe(item.name,item.iconUrl);
            ShowIngredients(item.ingredients);
            ShowInstructions(item.instructions);
            $('#members').val(item.nbGuests);
            oldMember = $('#members').val();
            console.log(oldMember);
        }
    })
}

// update recipe of add
var updateRecipe = (ricipeId,increment) => {
    // console.log(ricipeId);
    // console.log(increment);
    allData.forEach(item => {
        if(item.id == ricipeId){
            // console.log(item.ingredients)
            updateIngredient(item.ingredients, increment);
            $("#members").val(increment);
            // console.log(increment);
        }
    })
}
// update recipes of minus
var updateRecipes = (ricipeId,decrement) => {
    // console.log(ricipeId);
    // console.log(increment);
    allData.forEach(item => {
        if(item.id == ricipeId){
            // console.log(item.ingredients)
            updateIngredients(item.ingredients, decrement);
            $("#members").val(decrement);
            // console.log(increment);
        }
    })
}

// update ingredient of add
var updateIngredient=(ing ,increment)=>{
    // console.log(ing);
    resultUpdate = "";
    // console.log(increment);
    ing.forEach(item =>{
        // console.log(item.quantity * parseInt(increment) / oldMember);
        var addIngredient = item.quantity * parseInt(increment) / oldMember;
        resultUpdate+= `
        <tr>
            <td> <img src="${item.iconUrl}" class="img-fluid" width="50px"> </td>
            <td> ${addIngredient} </td>
            <td> ${item.unit[0]} </td>
            <td> ${item.name} </td>
        </tr>
        `; 
    })
    $('#ingredient-result').html(resultUpdate);
}
// update ingredients of minus
var updateIngredients=(ing ,decrement)=>{
    // console.log(ing);
    resultUpdate = "";
    // console.log(increment);
    ing.forEach(item =>{
        // console.log(item.quantity * parseInt(increment) / oldMember);
        var addIngredient = item.quantity * parseInt(decrement) / oldMember;
        resultUpdate+= `
        <tr>
            <td> <img src="${item.iconUrl}" class="img-fluid" width="50px"> </td>
            <td> ${addIngredient} </td>
            <td> ${item.unit[0]} </td>
            <td> ${item.name} </td>
        </tr>
        `; 
    })
    $('#ingredient-result').html(resultUpdate);
}

// Increment of member
var getIncrement = () => {
    var increment = $('#members').val();
    var allCalculate = (parseInt(increment) + 1);
    if(allCalculate <= 15){
    $("#members").val(allCalculate);
    // console.log(allCalculate)
    }
}
// decrement of member
var getDecrement = () => {
    var decrement = $('#members').val();
    var allCalculate = (parseInt(decrement) - 1);
    if(allCalculate >= 1){
    $("#members").val(allCalculate);
    // console.log(allCalculate)
    }
}

// show Recipes
function showRecipe(name,img){
    var result = "";
    result += `
        <tr>
            <td> <h3> ${name} </h3> </td>
            <td> <img src="${img}" class="img-fluid" width="200px"> </td>
        </tr>
    `;
    $('#recipe-result').html(result);
    $('#show-rulers').show();
}

// show ingredient
var ShowIngredients = (ing) => {
    var ingre = "";
    ing.forEach(item => {
        ingre += `
        <tr>
            <td> <img src="${item.iconUrl}" class="img-fluid" width="50px"> </td>
            <td> ${item.quantity} </td>
            <td> ${item.unit[0]} </td>
            <td> ${item.name} </td>
        </tr>
        `; 
    });
    $('#ingredient-result').html(ingre);
    $('#text-ingredient').show();
}

// show instruction
var ShowInstructions = (instru) => {
    var instruction = "";
    var splitStep = instru.split("<step>");
    for(let i = 1; i < splitStep.length; i++){
        instruction +=`
            <p class="text-primary"> Step ${i} </p> 
            <p> ${splitStep[i]} </p> 
        `;
    $('#instruction-result').html(instruction);
    $('#text-instruction').show();
    $('#all-member').show();
    }
}


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
        var selectId = $('#select').val();
        var decrement = $('#members').val();
        getDecrement(decrement,selectId);
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
            // console.log(oldMember);
        }
    })
}

// update recipe
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

// update ingredient
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

// Increment of member
var getIncrement = () => {
    var increment = $('#members').val();
    var addition = (parseInt(increment) + 1);
    if(addition <= 15){
    $("#members").val(addition);
    // console.log(addition)
    }
}
// Decrement of member
// var getDecrement = (minues) => {
//     var reduce = (parseInt(minues) - 1);
//     if(reduce >= 0){
//         printOut(reduce);
//     }
// }
// get id to output on member

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


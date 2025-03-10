const bord = [{
    title : ' CLASSIC',
    img : '/board/Frame 337.svg'
},
{
    title : 'SOFT PURPLE',
    img : '/board/Frame 336.svg'
},
{
    title : 'VIP',
    img : '/board/Frame.svg'
},
{
    title : 'SOFT BLUE',
    img : '/board/Frame.svg'
}]


let bordHtml = '';


bord.forEach((bord) => {
    bordHtml += `
    <div class="DefaultBoard">
    <img class="Board" src="${bord.img}">
    <div class="checkpart">
        <input class="input1" type="checkbox">
        <h1 class="BoardName">
            ${bord.title}
        </h1>
    </div>
    `
});

document.querySelector('.bordStyle').innerHTML = bordHtml;
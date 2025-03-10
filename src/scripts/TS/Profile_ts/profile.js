const bord = [{
    title : ' CLASSIC',
    img : '../public/images/board/Frame 337.svg'
},
{
    title : 'SOFT PURPLE',
    img : '../public/images/board/Frame 336.svg'
},
{
    title : 'VIP',
    img : '../public/images/board/Frame 338.svg'
},
{
    title : 'SOFT BLUE',
    img : '../public/images/board/Frame.svg'
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

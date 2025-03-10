const tag = [{
    logo : 'logo/person_add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg',
    tagTitle : 'Open an Account',
    tagText : ' Join the community, track your progress, and compete with players worldwide. Signing up is quick, easy, and your first step to becoming a ping pong champion!'
},
{
    logo : 'logo/ping-pong (1).png',
    tagTitle : 'PingPong.io Online',
    tagText : 'Compete with players from around the world, showcase your skills in real-time matches. The ultimate Ping Pong challenge is just a click away!'
},
{
    logo : 'logo/forum_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg',
    tagTitle : 'Chat',
    tagText : 'Talk strategy, challenge friends, and celebrate your victories. Our chat feature keeps you connected with the Ping Pong community in real-time!'
},
{
    logo : 'logo/event_available_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg',
    tagTitle : 'Tournamentst',
    tagText : 'Join tournaments, compete with top players, and prove your dominance. Climb the ranks and become a Ping Pong champion!'
}];

let htmlGen = '';

tag.forEach((tag)=>{
    htmlGen += `
    <div class="tag1">
        <dev class="pic-tag">
            <img class="add-acc" src="${tag.logo}">
                </dev>
                <p class="tag-text">
                    ${tag.tagTitle}
                </p>
                <p class="tag-text1">
                    ${tag.tagText}
                </p>
    </div>
    `
});

document.querySelector('.js-tag').innerHTML = htmlGen;
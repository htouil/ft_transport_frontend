export const updateHomeHeadermain5 = () => {
    const main5 = [{
        title : 'Get started',
        key1 : 'Play Online',
        key2 : 'Invite friends'
    },
    {
        title : 'Account',
        key1 : 'Join',
        key2 : 'Play & explore'
    },
    {
        title : 'PingPong.io',
        key1 : 'Support',
        key2 : 'Sign up'
    }]
    
    
    let htmlGen1 = '';
    
    main5.forEach((main5)=>{
        
        htmlGen1 += `
        <div class="wq1">
        <p class="xp1">
        ${main5.title}
        </p>
        <p class="xr1">
        ${main5.key1}
        </p>
        <p class="xr1">
        ${main5.key2}
        </p>
        </div>
        `
    });
    
    const element = document.querySelector('.js-wq1');
    if (element) {
        element.innerHTML = htmlGen1;
    }
    
    // console.log(htmlGen1);
};

// module.exports = { updateHomeHeadermain5 };

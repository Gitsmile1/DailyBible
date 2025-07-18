document.addEventListener('DOMContentLoaded', () => {
    // 随机背景图片功能
    const backgroundImages = [
        './bg1.webp',
        './bg2.webp',
        './bg3.webp',
        './bg4.webp',
        './bg5.webp',
        './bg6.webp'
    ];
    const randomBgIndex = Math.floor(Math.random() * backgroundImages.length);
    document.body.style.backgroundImage = `url('${backgroundImages[randomBgIndex]}')`;
    // 获取音乐和按钮元素
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');

    // 初始化按钮文本
    musicToggle.textContent = bgMusic.paused ? 'Play Music' : 'Pause Music';
    // 用户点击按钮切换播放/暂停状态
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.muted = false; // 取消静音
            bgMusic.play(); // 播放音乐
            musicToggle.textContent = 'Pause Music';
        } else {
            bgMusic.pause(); // 暂停音乐
            musicToggle.textContent = 'Play Music';
        }
    });

    
    // 新增日期显示功能
    const updateDateDisplay = () => {
        const date = new Date();
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        
        const formattedDate = `
            ${(date.getMonth() + 1).toString().padStart(2, '0')}/
            ${date.getFullYear()}
        `.replace(/\s+/g, ' '); // 去除多余空格

        document.getElementById('date-display').textContent = formattedDate;
    };

    // 初始化日期显示
    updateDateDisplay();

    // 原文件加载和随机句子逻辑保持不变
    fetch('text.txt')
        .then(response => {
            if (!response.ok) throw new Error('File loading failed');
            return response.text();
        })
        .then(text => {
            const sentences = text.split('。').filter(s => s.trim() !== ''); // 分割并过滤空句子
            const outputDiv = document.getElementById('output');
            
            if (sentences.length === 0) {
                outputDiv.textContent = 'No valid sentences were found in the file.';
                return;
            }

            // 生成随机索引
            const randomIndex = Math.floor(Math.random() * sentences.length);
            const randomSentence = sentences[randomIndex].trim();
            
            outputDiv.innerHTML = `
                <blockquote>${randomSentence}</blockquote>
            `;
        })
        .catch(error => {
            console.error('error:', error);
            document.getElementById('output').textContent = 'Unable to load text file';
        });
          
});

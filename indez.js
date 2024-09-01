addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    try {
        // 从目标网址获取网页内容
        const response = await fetch('http://ao.ke');
        const text = await response.text();

        // 使用正则表达式只提取账号和正确显示的密码（不包含星号的）
        const accountRegex = /(\S+区账号(?:（[\s\S]*?）)?)[\s\S]*?账号：(\S+@\S+) 密码：([^\*]+)/g;
        const accounts = [...text.matchAll(accountRegex)];

        // 生成账号列表的HTML
        const accountListHTML = accounts.map(match => `
            <div class="account-item">
                <h2>${match[1]}</h2>
                <p><strong>账号：</strong>${match[2]}</p>
                <p><strong>密码：</strong>${match[3]}</p>
            </div>
        `).join('');

        // 生成最终的HTML页面
        const html = `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>小火箭账号分享</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    color: #333;
                    text-align: center;
                    padding: 20px;
                    margin: 0;
                }
                .container {
                    max-width: 800px;
                    margin: 0 auto;
                    background: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    font-size: 24px;
                    margin-bottom: 20px;
                    color: #007bff;
                }
                .account-list {
                    margin-top: 20px;
                }
                .account-item {
                    margin: 15px 0;
                    padding: 15px;
                    border: 1px solid #e9ecef;
                    border-radius: 5px;
                    background-color: #fdfdfe;
                    text-align: left;
                }
                .account-item h2 {
                    margin-bottom: 10px;
                    font-size: 20px;
                    color: #495057;
                }
                .account-item p {
                    margin: 5px 0;
                    font-size: 16px;
                    color: #6c757d;
                }
                .promo {
                    margin-top: 40px;
                    padding: 15px;
                    background-color: #007bff;
                    color: #fff;
                    border-radius: 5px;
                }
                .promo a {
                    color: #fff;
                    font-weight: bold;
                    text-decoration: none;
                }
                .promo a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>小火箭账号分享</h1>
                <div class="account-list">
                    ${accountListHTML}
                </div>
                <div class="promo">
                    <p>加入我的 Telegram 频道，获取更多优质账号和最新资讯：</p>
                    <p><a href="https://t.me/MFJD666" target="_blank">@MFJD666</a></p>
                </div>
            </div>
        </body>
        </html>
        `;

        return new Response(html, {
            headers: { 'content-type': 'text/html;charset=UTF-8' },
        });
    } catch (error) {
        // 捕获和返回错误信息
        console.error('Error:', error);
        return new Response('Error occurred: ' + error.message, {
            status: 500,
            headers: { 'content-type': 'text/plain;charset=UTF-8' },
        });
    }
}

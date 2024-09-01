addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    try {
        // 从目标网址获取网页内容
        const response = await fetch('http://ao.ke');
        const text = await response.text();

        // 检查抓取的原始内容
        if (!text || text.trim().length === 0) {
            return new Response('无法获取到内容，请检查目标网址是否有效。', {
                status: 500,
                headers: { 'content-type': 'text/plain;charset=UTF-8' },
            });
        }

        // 直接显示抓取的原始内容（调试用）
        return new Response(text, {
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

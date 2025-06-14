// 添加全局函数声明
window.searchScore = function() {
    const inputName = document.getElementById('searchName').value.trim();
    const resultDiv = document.getElementById('result');
    const student = window.students?.[inputName]; // 使用可选链操作符

    if (student) {
        resultDiv.style.display = 'block';
        document.getElementById('studentName').textContent = inputName;

        const scoreElement = document.getElementById('totalScore');
        scoreElement.textContent = `总分：${student.total}`;
        scoreElement.className = `score ${student.total >= 0 ? 'positive' : 'negative'}`;

        const detailsList = document.getElementById('dailyDetails');
        detailsList.innerHTML = '';
        for (const [date, score] of Object.entries(student.details)) {
            const li = document.createElement('li');
            li.className = 'detail-item';
            li.innerHTML = `${date}: <span class="${score >= 0 ? 'positive' : 'negative'}">${score}</span>`;
            detailsList.appendChild(li);
        }

        const comment = document.getElementById('comment');
        if (student.total > 30) {
            comment.innerHTML = '<div class="positive">表现优异！继续保持！</div>';
        } else if (student.total < 0) {
            comment.innerHTML = '<div class="negative">需要加强行为规范！</div>';
        } else if (student.total == 0) {
            comment.innerHTML = '<div class="negative">咱们这团队Buff好像没覆盖到你？感觉你一直在挂机模式，分数没变化。</div>';
        } else {
            comment.innerHTML = '<div>有进步空间，继续努力！</div>';
        }
    } else {
        resultDiv.style.display = 'block';
        document.getElementById('studentName').textContent = "学生信息未找到";
        document.getElementById('totalScore').textContent = "";
        document.getElementById('dailyDetails').innerHTML = "";
        document.getElementById('comment').innerHTML = '<div class="negative">请输入正确的学生姓名</div>';
    }
}

// 新增数据加载逻辑
fetch('./data.json')
    .then(response => {
        if (!response.ok) throw new Error(`📮 数据请求失败（状态码：${response.status}）`);
        return response.json();
    })
    .then(data => {
        window.students = data;
        console.log('✅ 数据加载成功 共加载学生记录：', Object.keys(data).length);
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`💥 数据加载失败：${error.message}`);
    });

// 新增查询功能实现
window.searchScore = function() {
    const inputName = document.getElementById('searchName').value.trim();
    const resultDiv = document.getElementById('result');
    const student = window.students?.[inputName];

    if (student) {
        resultDiv.style.display = 'block';
        document.getElementById('studentName').textContent = inputName;

        const scoreElement = document.getElementById('totalScore');
        scoreElement.textContent = `总分：${student.total}`;
        scoreElement.className = `score ${student.total >= 0 ? 'positive' : 'negative'}`;

        const detailsList = document.getElementById('dailyDetails');
        detailsList.innerHTML = '';
        for (const [date, score] of Object.entries(student.details)) {
            const li = document.createElement('li');
            li.className = 'detail-item';
            li.innerHTML = `${date}: <span class="${score >= 0 ? 'positive' : 'negative'}">${score}</span>`;
            detailsList.appendChild(li);
        }

        const comment = document.getElementById('comment');
        if (student.total > 30) {
            comment.innerHTML = '<div class="positive">表现优异！继续保持！</div>';
        } else if (student.total < 0) {
            comment.innerHTML = '<div class="negative">需要加强行为规范！</div>';
        } else {
            comment.innerHTML = '<div>有进步空间，继续努力！</div>';
        }
    } else {
        resultDiv.style.display = 'block';
        document.getElementById('studentName').textContent = "学生信息未找到";
        document.getElementById('totalScore').textContent = "";
        document.getElementById('dailyDetails').innerHTML = "";
        document.getElementById('comment').innerHTML = '<div class="negative">请输入正确的学生姓名</div>';
    }
}

// 增强版数据加载（添加加载状态检测）
if (window.location.protocol === 'file:') {
    alert('🚫 检测到使用file://协议访问\n\n请按以下步骤操作：\n1. 安装VSCode Live Server扩展\n2. 右键index.html选择"Open with Live Server"\n3. 观察地址栏变为http://localhost开头');
    throw new Error('禁止使用文件协议访问');
}

fetch('./data.json')
    .then(response => {
        if (!response.ok) throw new Error(`📮 数据请求失败（状态码：${response.status}）`);
        return response.json();
    })
    .then(data => {
        window.students = data;
        console.log('✅ 数据加载成功 共加载学生记录：', Object.keys(data).length);
        document.querySelector('button').disabled = false; // 启用查询按钮
    })
    .catch(error => {
        console.error('Error:', error);
        alert(`💥 数据加载失败：${error.message}`);
        document.querySelector('button').disabled = true; // 禁用查询按钮
    });

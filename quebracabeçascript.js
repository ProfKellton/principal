const pieces = document.querySelectorAll('.piece');
let emptyIndex = 8; // O índice do espaço vazio

// Substitua essas URLs pelas URLs corretas das suas imagens
const images = [
    'imagensG/PraiaParte1.png',  
    'imagensG/PraiaParte2.png',
    'imagensG/PraiaParte3.png',
    'imagensG/PraiaParte4.png',
    'imagensG/PraiaParte5.png',
    'imagensG/PraiaParte6.png',
    'imagensG/PraiaParte7.png',
    'imagensG/PraiaParte8.png',
];

function init() {
    pieces.forEach((piece, index) => {
        if (index < 8) {
            const img = document.createElement('img');
            img.src = images[index];

            // Teste de carregamento da imagem
            img.onload = () => console.log(`Imagem ${img.src} carregada com sucesso`);
            img.onerror = () => console.log(`Erro ao carregar a imagem ${img.src}`);

            piece.appendChild(img);
        } else {
            piece.classList.add('empty');
        }
        piece.addEventListener('click', () => movePiece(index));
    });
}

// Função para embaralhar as peças do quebra-cabeça
function shufflePuzzle() {
    const positions = Array.from(Array(9).keys()); // [0, 1, 2, 3, 4, 5, 6, 7, 8]

    // Embaralha as posições
    for (let i = positions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    // Atualiza as peças de acordo com as posições embaralhadas
    pieces.forEach((piece, index) => {
        piece.innerHTML = ''; // Limpa o conteúdo anterior
        if (positions[index] < 8) {
            const img = document.createElement('img');
            img.src = images[positions[index]];
            piece.appendChild(img); // Adiciona a nova imagem
            piece.classList.remove('empty'); // Remove a classe vazia
        } else {
            piece.classList.add('empty'); // Mantém o espaço vazio
        }
    });

    emptyIndex = positions.indexOf(8); // Atualiza o índice do espaço vazio
}

function movePiece(index) {
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    const clickedRow = Math.floor(index / 3);
    const clickedCol = index % 3;

    if ((Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
        (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow)) {
        swapPieces(index);
    }
}

function swapPieces(index) {
    const tempImg = pieces[index].innerHTML;
    pieces[index].innerHTML = ''; // Limpa a peça que foi clicada
    pieces[emptyIndex].innerHTML = tempImg; // Move a imagem para o espaço vazio

    pieces[emptyIndex].classList.remove('empty');
    pieces[index].classList.add('empty');
    
    emptyIndex = index; // Atualiza o índice do espaço vazio
}

init();

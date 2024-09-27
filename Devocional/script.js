document.getElementById('searchButton').addEventListener('click', fetchChapter);

function fetchChapter() {
    const chave = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHIiOiJTdW4gSnVuIDMwIDIwMjQgMTg6NTI6MTUgR01UKzAwMDAubHVjaWFubzU3QGdtYWlsLmNvbSIsImlhdCI6MTcxOTc3MzUzNX0.GYJ2ialkCn4HztSsjHfBF-cE6Fi_lCJIqvDqFHSMWTI';

    const dia = document.getElementById('dia').value.trim();
    const mes = document.getElementById('mes').value.trim();
    if (!dia || !mes) {
        alert('Por favor, preencha dia e mês');
        return;
    }

    const devocionais = [...abril,...agosto]

    let devocional_busca = devocionais.find(devocional => devocional.dia == dia && devocional.mes == mes);
    // for (const devocional of devocionais) {
    //     if (devocional.dia == dia && devocional.mes == mes) {
    //         devocional_busca = devocional;
    //         break;
    //     }
    // }

    if (devocional_busca != undefined) {
        const leitura_familiar = document.getElementById('leitura-familiar');
        const leitura_pessoal = document.getElementById('leitura-pessoal');
        leitura_familiar.innerHTML = ''; // Limpa o conteúdo anterior
        leitura_pessoal.innerHTML = ''; // Limpa o conteúdo anterior

        devocional_busca.leitura_familia.forEach(leitura => {
            fetch(`https://www.abibliadigital.com.br/api/verses/acf/${leitura.livro}/${leitura.capitulo}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${chave}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    const title = document.createElement('h2');

                    title.textContent = `${data.book.name} ${data.chapter.number}`;
                    leitura_familiar.appendChild(title);
                    data.verses.forEach(verse => {
                        const verseElement = document.createElement('p');
                        verseElement.textContent = `${verse.number}. ${verse.text}`;
                        leitura_familiar.appendChild(verseElement);
                    })

                    // for (const verse of data.verses) {
                    //     const verseElement = document.createElement('p');
                    //     verseElement.textContent = `${verse.number}. ${verse.text}`;
                    //     leitura_familiar.appendChild(verseElement);
                    // }
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao buscar o capítulo. Verifique os dados e tente novamente.');
                });
        })

        devocional_busca.leitura_pessoal.forEach(leitura => {
            fetch(`https://www.abibliadigital.com.br/api/verses/acf/${leitura.livro}/${leitura.capitulo}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${chave}`
                }
            })
                .then(response => response.json())
                .then((data) => {
                    const title = document.createElement('h2');

                    title.textContent = `${data.book.name} ${data.chapter.number}`;
                    leitura_pessoal.appendChild(title);
                    data.verses.forEach(verse => {
                        const verseElement = document.createElement('p');
                        verseElement.textContent = `${verse.number}. ${verse.text}`;
                        leitura_pessoal.appendChild(verseElement);
                    })
                })
                .catch(error => {
                    console.error('Erro:', error);
                    alert('Erro ao buscar o capítulo. Verifique os dados e tente novamente.');
                });
        })

        // for (const leitura of devocional_busca.livros) {

        //     fetch(`https://www.abibliadigital.com.br/api/verses/acf/${leitura.livro}/${leitura.capitulo}`, {
        //         method: 'GET',
        //         headers: {
        //             'Authorization': `Bearer ${token}`
        //         }
        //     })
        //         .then(response => response.json())
        //         .then((data) => {
        //             const title = document.createElement('h2');

        //             title.textContent = `${data.book.name} ${data.chapter.number}`;
        //             verseBox.appendChild(title);
        //             for (verse of data.verses) {
        //                 const verseElement = document.createElement('p');
        //                 verseElement.textContent = `${verse.number}. ${verse.text}`;
        //                 verseBox.appendChild(verseElement);
        //             }
        //         })
        //         .catch(error => {
        //             console.error('Erro:', error);
        //             alert('Erro ao buscar o capítulo. Verifique os dados e tente novamente.');
        //         });


        // }
    }


}

const agosto = [
    {
        dia: 1,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jz",            // Abreviação do livro 
                capitulo: 15,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 20,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 19,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 41,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [17],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [20]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 28,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 17,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "mc",                    // Abreviação do livro 
                capitulo: 14,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 72,                // Verso que termina a leitura
                versos_vermelhos: [6,7,8,9,13,14,15,18,20,21,22,24,25,27,28,30,32,34,36,37,38,41,48,49,62],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [35,39],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 2,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jz",            // Abreviação do livro 
                capitulo: 16,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 31,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [28],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 20,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 38,         // Verso que termina a leitura
                versos_vermelhos: [35],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [36],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [18,19,20,21,24,32]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 29,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 32,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [11,12,13]        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "mc",                    // Abreviação do livro 
                capitulo: 15,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 47,                // Verso que termina a leitura
                versos_vermelhos: [34],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [14, 24, 25],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [38,39]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 3,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jz",            // Abreviação do livro 
                capitulo: 17,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 13,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 21,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 40,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [5],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 30,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 24,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [10,11]        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "jr",                    // Abreviação do livro 
                capitulo: 31,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 40,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [12,13,18,19],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [3,20]                // Lista com o número dos versos que estão em azul (colocar os números separados por ,virgula Ex.: [1, 2, 3])
            },{
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "mc",                    // Abreviação do livro 
                capitulo: 16,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 20,                // Verso que termina a leitura
                versos_vermelhos: [15,16,17,18],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [6,7,19,20]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 4,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jz",            // Abreviação do livro 
                capitulo: 18,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 31 ,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 22,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 30,         // Verso que termina a leitura
                versos_vermelhos: [7,8,10,18,21],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [17,18,20],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [14]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 32,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 44,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [16,17,18,19,20,21,22,23,24,25],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [27,38,39,40]        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 1,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 6,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,2,3,4,5,6]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 2,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 12,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [11,12]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 5,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jz",            // Abreviação do livro 
                capitulo: 19,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 30,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 23,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 35,         // Verso que termina a leitura
                versos_vermelhos: [11],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 33,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final:26,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [11],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 3,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 8,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,7],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,6,8]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 4,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 8,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [3,5,7,8]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 6,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jz",            // Abreviação do livro 
                capitulo: 20,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 48,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 24,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 27,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [16]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 34,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 5,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 12,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,6],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [11, 12]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 6,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 10,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [9]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 7,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jz",            // Abreviação do livro 
                capitulo: 21,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 25,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 25,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 27,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 35,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 19,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [17],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [10]        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 7,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 17,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9,17],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [10]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 8,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 9,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 8,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "rt",            // Abreviação do livro 
                capitulo: 1,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [16]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 26,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 32,         // Verso que termina a leitura
                versos_vermelhos: [14,15,16,17,18],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [29]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 36,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 32,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "jr",                    // Abreviação do livro 
                capitulo: 45,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 5,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 9,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 20,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,11,13,14,19,20],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [7,8,9,10,12]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 9,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "rt",            // Abreviação do livro 
                capitulo: 2,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 23,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [12]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 27,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 44,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [35],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [25]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 37,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 21,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 10,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 18,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,12],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [17]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 10,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "rt",            // Abreviação do livro 
                capitulo: 3,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 18,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rt",             // Abreviação do livro 
                capitulo: 4,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 22,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },{
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "at",             // Abreviação do livro 
                capitulo: 28,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 31,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [8],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 38,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 28,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 11,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 7,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,7]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 12,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 8,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [6,7]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 11,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 1,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 28,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 1,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 32,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [9,10,25],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,6,16,17]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 39,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 18,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 13,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 6,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 14,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 7,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 12,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 2,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 36,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9,10],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [26]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 2,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 29,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [4,11,29]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 40,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 16,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 15,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 5,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 16,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 11,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,6,7,8,9,11]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 13,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 3,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 21,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [10,18,19]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 3,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final:   31,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [4,22,23,24,25,26,27,28]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 41,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 18,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 17,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 15,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 14,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 4,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 4,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 25,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,6,7,8,17]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 42,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 18,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 50,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [2,46,49,50],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,25,26,27,28,29,30,31,32,33]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 15,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 5,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 12,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "1sm",             // Abreviação do livro 
                capitulo: 6,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 21,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 5,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 21,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,3,4,5,6,7,8,9,10,11,15,17,18,19,20,21]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 43,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 13,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 19,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 14,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [7,8,9,10,11,12,13,14]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 16,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 7,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 17,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [12]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "1sm",             // Abreviação do livro 
                capitulo: 8,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 22,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [6,7,8,9],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 6,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 23,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [2,3,4,6,7,8,9,10,11,12,13,14,18,23]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 44,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 30,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 20,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 9,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,6]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 21,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 13,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 17,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 9,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 27,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 7,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 25,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [25],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [4,6,12]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 46,           // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 28,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 22,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 26,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 18,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 10,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 27,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 8,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 39,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,2,10,11,14,15,16,17,18,26,27,28,29,30,31,32,33,34,35,37,38,39]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 47,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 7,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 23,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 6,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,2,3,4,5,6]       // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 24,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 10,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 19,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 11,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 15,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 9,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 33,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [5],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [15]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 48,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 47,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 25,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 22,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 20,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 12,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 25,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [20,21,22,23,24]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 10,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 21,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [6,7,8,9,11,12]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 49,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 39,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 26,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 12,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9,10,11,12],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 27,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 14,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [6,7,8,9,10,11,12],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,3,4,5,13,14]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 21,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 13,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 23,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 11,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 36,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [29,30,31,32],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [33,34,35,36]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 50,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 46,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 28,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 9,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 29,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 11,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [10,11]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 22,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 14,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 52,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 1,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 21,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,2,5]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 51,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 64,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 30,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 12,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,8,9,10,11,12],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,6,7]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 23,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 15,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 35,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [22,29]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 13,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 14,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [8,10,11]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "jr",            // Abreviação do livro 
                capitulo: 52,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 34,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 31,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 24,                // Verso que termina a leitura
                versos_vermelhos: [5, 7, 8],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [24]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 24,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 16,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 23,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [7,]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 14,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 23,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [7,8,9,17,18,19,]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "lm",            // Abreviação do livro 
                capitulo: 1,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [9,11,20,21,22],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [18]        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 32,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 11,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,2,5,6,7,10,11]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 25,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 17,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 58,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [37,45,47]        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 15,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 33,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [13,30,31,32,33],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [1,2,4,5,6,7]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "lm",            // Abreviação do livro 
                capitulo: 2,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [19,20,21,22],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 33,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 22,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [9,11,18,19,20,21,22]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 26,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 18,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 30,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "rm",             // Abreviação do livro 
                capitulo: 16,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 27,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [24,25,26,27],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "lm",            // Abreviação do livro 
                capitulo: 3,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 66,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [42,43,44,45,46,47,48,49,50,51,52,53,54,56,57,58,59,60,61,62,63,64,65,66],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [22,23,24,25,26,27,28,29,30,31,32,39,40,41]        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 34,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 22,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 27,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 19,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 24,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "1co",             // Abreviação do livro 
                capitulo: 1,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 31,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [2,3,9,18,21,24,27,28,29,30,31]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "lm",            // Abreviação do livro 
                capitulo: 4,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 35,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 28,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2,3])
                versos_verdes: [1,2,3,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 28,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 20,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 43,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "1co",             // Abreviação do livro 
                capitulo: 2,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 16,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [2,9,12]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "lm",            // Abreviação do livro 
                capitulo: 5,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,19,20,21,22],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 36,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 12,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [5,6,7,8,9,10]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 29,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 21,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 15,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "1sm",             // Abreviação do livro 
                capitulo: 22,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 23,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 3,               // Ordem que o livro está na leitura
                livro: "1co",             // Abreviação do livro 
                capitulo: 3,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 23,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [9,11,16,21,22,23]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "ez",            // Abreviação do livro 
                capitulo: 1,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 28,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 37,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 40,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [3,4,5,6,7,8,9,11,17,18,19,23,24,25,26,27,28,29,30,31,33,34,37,39,40]                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 30,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 23,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 29,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [2,4,10,11,12],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "1co",             // Abreviação do livro 
                capitulo: 4,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 21,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "ez",            // Abreviação do livro 
                capitulo: 2,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 10,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 38,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 22,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    },{
        dia: 31,      // Dia da leitura
        mes: 8,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "1sm",            // Abreviação do livro 
                capitulo: 24,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 22,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "1co",             // Abreviação do livro 
                capitulo: 5,             // Capitulo que será feita a leitura
                verso_inicial: 1,        // Verso em que se inicia a leitura
                verso_final: 13,         // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],       // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: [6,7,8]   // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
        ],
        leitura_pessoal: [
            {
                ordem: 1,               // Ordem que o livro está na leitura
                livro: "ez",            // Abreviação do livro 
                capitulo: 3,            // Capitulo que será feita a leitura
                verso_inicial: 1,       // Verso em que se inicia a leitura
                verso_final: 27,        // Verso que termina a leitura
                versos_vermelhos: [],   // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [],      // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []        // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            },
            {
                ordem: 2,               // Ordem que o livro está na leitura
                livro: "sl",                    // Abreviação do livro 
                capitulo: 39,                    // Capitulo que será feita a leitura
                verso_inicial: 1,               // Verso em que se inicia a leitura
                verso_final: 13,                // Verso que termina a leitura
                versos_vermelhos: [],    // Lista com o número dos versos que estão em vermelho (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_verdes: [4,5,6,7,8,9,10,11,12,13],    // Lista com o número dos versos que estão em verde (colocar os números separados por virgula Ex.: [1, 2, 3])
                versos_azuis: []                // Lista com o número dos versos que estão em azul (colocar os números separados por virgula Ex.: [1, 2, 3])
            }
        ]
    }
]

const abril = [
    {
        dia: 1,      // Dia da leitura
        mes: 4,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 4,            
                verso_inicial: 1,       
                verso_final: 35,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },
            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 1,              
                verso_inicial: 1,        
                verso_final: 6,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: [1, 2, 3, 4, 5, 6]
            },

            {
                ordem: 3,             
                livro: "sl",            
                capitulo: 2,             
                verso_inicial: 1,        
                verso_final: 12,         
                versos_vermelhos: [],   
                versos_verdes: [],       
                versos_azuis: [11, 12 ]   
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 19,            
                verso_inicial: 1,       
                verso_final: 29,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [14, 17, 21, 23, 26, 27]       
            },
            {
                ordem: 2,               
                livro: "co",                  
                capitulo: 2,              
                verso_inicial: 1,            
                verso_final: 23,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [1, 6, 7, 13, 14, 15]              
            }
        ]
    },

    {
        dia: 2,      // Dia da leitura
        mes: 4,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 5,            
                verso_inicial: 1,       
                verso_final: 19,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },
            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 3,              
                verso_inicial: 1,        
                verso_final: 8,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 7],       
                versos_azuis: [5, 6, 8]
            },

            {
                ordem: 3,             
                livro: "sl",            
                capitulo: 4,             
                verso_inicial: 1,        
                verso_final: 8,         
                versos_vermelhos: [],   
                versos_verdes: [1],       
                versos_azuis: [3, 5, 7, 8]   
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 20,            
                verso_inicial: 1,       
                verso_final: 30,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [10, 22, 23, 24]       
            },
            {
                ordem: 2,               
                livro: "co",                  
                capitulo: 3,              
                verso_inicial: 1,            
                verso_final: 25,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [1, 12, 13, 14, 15, 23]              
            }
        ]
    },

    {
        dia: 3,      // Dia da leitura
        mes: 4,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 6,            
                verso_inicial: 1,       
                verso_final: 30,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },
            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 5,              
                verso_inicial: 1,        
                verso_final: 12,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 6],       
                versos_azuis: [11, 12]
            },

            {
                ordem: 3,             
                livro: "sl",            
                capitulo: 6,             
                verso_inicial: 1,        
                verso_final: 10,         
                versos_vermelhos: [],   
                versos_verdes: [1, 2, 3, 4, 5, 6, 7],       
                versos_azuis: [9]   
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 21,            
                verso_inicial: 1,       
                verso_final: 31,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [2, 3, 4, 21, 23, 30, 31]       
            },
            {
                ordem: 2,               
                livro: "co",                  
                capitulo: 4,              
                verso_inicial: 1,            
                verso_final: 18,                
                versos_vermelhos: [],    
                versos_verdes: [2, 3, 4, 12],    
                versos_azuis: [18]              
            }
        ]
    },

    {
        dia: 4,      // Dia da leitura
        mes: 4,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 7,            
                verso_inicial: 1,       
                verso_final: 38,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },
            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 7,              
                verso_inicial: 1,        
                verso_final: 17,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 17],       
                versos_azuis: [10]
            },

            {
                ordem: 3,             
                livro: "sl",            
                capitulo: 8,             
                verso_inicial: 1,        
                verso_final: 9,         
                versos_vermelhos: [],   
                versos_verdes: [1, 2, 3, 4, 5, 6, 7, 8, 9],       
                versos_azuis: []   
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 22,            
                verso_inicial: 1,       
                verso_final: 29,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [1, 4, 6, 17, 18, 19]       
            },
            {
                ordem: 2,               
                livro: "1ts",                  
                capitulo: 1,              
                verso_inicial: 1,            
                verso_final: 10,                
                versos_vermelhos: [],    
                versos_verdes: [2, 3],    
                versos_azuis: []              
            }
        ]
    },

    {
        dia: 5,      // Dia da leitura
        mes: 4,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 8,            
                verso_inicial: 1,       
                verso_final: 36,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },
            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 9,              
                verso_inicial: 1,        
                verso_final: 20,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 11, 13, 14, 19, 20],       
                versos_azuis: [7, 8, 9, 10, 12]
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 23,            
                verso_inicial: 1,       
                verso_final: 35,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [5, 12, 13, 14, 15, 17, 22, 23]
            },
            {
                ordem: 2,               
                livro: "1ts",                  
                capitulo: 2,              
                verso_inicial: 1,            
                verso_final: 20,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: []              
            }
        ]
    },

    {
        dia: 6,      // Dia da leitura
        mes: 4,      // Mês da leitura
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 9,            
                verso_inicial: 1,       
                verso_final: 24,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },
            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 10,              
                verso_inicial: 1,        
                verso_final: 18,         
                versos_vermelhos: [],     
                versos_verdes: [1, 12],       
                versos_azuis: [17]
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 24,            
                verso_inicial: 1,       
                verso_final: 34,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [16]
            },
            {
                ordem: 2,               
                livro: "1ts",                  
                capitulo: 3,              
                verso_inicial: 1,            
                verso_final: 13,                
                versos_vermelhos: [],    
                versos_verdes: [9, 10, 11, 12, 13],
                versos_azuis: [7, 8]             
            }
        ]
    },

    {
        dia: 7,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 10,            
                verso_inicial: 1,       
                verso_final: 20,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [3]        
            },
            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 11,              
                verso_inicial: 1,        
                verso_final: 7,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: [5, 7]
            },
            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 12,              
                verso_inicial: 1,        
                verso_final: 8,         
                versos_vermelhos: [],     
                versos_verdes: [1],       
                versos_azuis: [6, 7]
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 25,            
                verso_inicial: 1,       
                verso_final: 28,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: []
            },
            {
                ordem: 2,               
                livro: "1ts",                  
                capitulo: 4,              
                verso_inicial: 1,            
                verso_final: 18,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [1, 18]              
            }
        ]
    },

    {
        dia: 8,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 11,            
                verso_inicial: 1,       
                verso_final: 47,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [45]        
            },
            {
                ordem: 2,               
                livro: "lv",              
                capitulo: 12,              
                verso_inicial: 1,        
                verso_final: 8,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: []
            },
            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 13,              
                verso_inicial: 1,        
                verso_final: 6,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6],       
                versos_azuis: []
            },

            {
                ordem: 4,               
                livro: "sl",              
                capitulo: 14,              
                verso_inicial: 1,        
                verso_final: 7,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: []
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 26,            
                verso_inicial: 1,       
                verso_final: 28,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: []
            },
            {
                ordem: 2,               
                livro: "1ts",                  
                capitulo: 5,              
                verso_inicial: 1,            
                verso_final: 28,                
                versos_vermelhos: [],    
                versos_verdes: [17, 25],    
                versos_azuis: [4, 5, 6, 7, 8, 9, 10, 11, 16, 23, 28]              
            }
        ]
    },

    {
        dia: 9,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 13,            
                verso_inicial: 1,       
                verso_final: 59,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 15,              
                verso_inicial: 1,        
                verso_final: 5,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: []
            },

            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 16,              
                verso_inicial: 1,        
                verso_final: 11,         
                versos_vermelhos: [],     
                versos_verdes: [1],       
                versos_azuis: [5, 6, 7, 8, 9, 11]
            },




        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 27,            
                verso_inicial: 1,       
                verso_final: 27,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [5, 6, 21]
            },
            {
                ordem: 2,               
                livro: "2ts",                  
                capitulo: 1,              
                verso_inicial: 1,            
                verso_final: 12,                
                versos_vermelhos: [],    
                versos_verdes: [11, 12],    
                versos_azuis: []              
            }
        ]
    },

    {
        dia: 10,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 14,            
                verso_inicial: 1,       
                verso_final: 57,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 17,              
                verso_inicial: 1,        
                verso_final: 15,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],       
                versos_azuis: []
            },


        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 28,            
                verso_inicial: 1,       
                verso_final: 28,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [5, 13, 14, 20, 21, 25, 26]
            },
            {
                ordem: 2,               
                livro: "2ts",                  
                capitulo: 2,              
                verso_inicial: 1,            
                verso_final: 17,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [16, 17]              
            }
        ]
    },

    {
        dia: 11,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 15,            
                verso_inicial: 1,       
                verso_final: 33,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 18,              
                verso_inicial: 1,        
                verso_final: 50,         
                versos_vermelhos: [],     
                versos_verdes: [2, 46, 49, 50],       
                versos_azuis: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 25, 26, 27, 28, 29, 30, 31, 32, 33]
            },

   

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 29,            
                verso_inicial: 1,       
                verso_final: 27,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [5, 15, 23, 25]
            },
            {
                ordem: 2,               
                livro: "2ts",                  
                capitulo: 3,              
                verso_inicial: 1,            
                verso_final: 18,                
                versos_vermelhos: [],    
                versos_verdes: [1, 2],    
                versos_azuis: [3, 13, 16, 18]              
            }
        ]
    },

    {
        dia: 12,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 16,            
                verso_inicial: 1,       
                verso_final: 34,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 19,              
                verso_inicial: 1,        
                verso_final: 14,         
                versos_vermelhos: [],     
                versos_verdes: [1],       
                versos_azuis: [7, 8, 9, 10, 11, 12, 13, 14]
            },

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 30,            
                verso_inicial: 1,       
                verso_final: 33,        
                versos_vermelhos: [],   
                versos_verdes: [7, 8, 9],      
                versos_azuis: [5]
            },
            {
                ordem: 2,               
                livro: "1tm",                  
                capitulo: 1,              
                verso_inicial: 1,            
                verso_final: 20,                
                versos_vermelhos: [],    
                versos_verdes: [17],    
                versos_azuis: [1, 2, 12, 14, 15]              
            }
        ]
    },
    {
        dia: 13,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 17,            
                verso_inicial: 1,       
                verso_final: 16,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 20,              
                verso_inicial: 1,        
                verso_final: 9,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: [5, 6, ]
            },

            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 21,              
                verso_inicial: 1,        
                verso_final: 13,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6],       
                versos_azuis: [ ]
            },

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "pv",            
                capitulo: 31,            
                verso_inicial: 1,       
                verso_final: 31,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
            },
            {
                ordem: 2,               
                livro: "1tm",                  
                capitulo: 2,              
                verso_inicial: 1,            
                verso_final: 15,                
                versos_vermelhos: [],    
                versos_verdes: [1, 2, 3, 4, 8],    
                versos_azuis: []              
            }
        ]
    },

    {
        dia: 14,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 18,            
                verso_inicial: 1,       
                verso_final: 30,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 22,              
                verso_inicial: 1,        
                verso_final: 31,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: []
            },

            



        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 1,            
                verso_inicial: 1,       
                verso_final: 18,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: []
            },
            {
                ordem: 2,               
                livro: "1tm",                  
                capitulo: 3,              
                verso_inicial: 1,            
                verso_final: 16,                
                versos_vermelhos: [],    
                versos_verdes: [16],    
                versos_azuis: [5, 15]              
            }
        ]
    },

    

    {
        dia: 15,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 19,            
                verso_inicial: 1,       
                verso_final: 37,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [25, 36]        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 23,              
                verso_inicial: 1,        
                verso_final: 6,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: [1, 2, 3, 4, 5, 6]
            },

            
            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 24,              
                verso_inicial: 1,        
                verso_final: 10,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: []
            },



        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 2,            
                verso_inicial: 1,       
                verso_final: 26,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [13]
            },
            {
                ordem: 2,               
                livro: "1tm",                  
                capitulo: 4,              
                verso_inicial: 1,            
                verso_final: 16,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [12, 15]              
            }
        ]
    },


    {
        dia: 16,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 20,            
                verso_inicial: 1,       
                verso_final: 27,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [7, 8, 24, 26]        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 25,              
                verso_inicial: 1,        
                verso_final: 22,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],       
                versos_azuis: []
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 32,            
                verso_inicial: 1,       
                verso_final: 22,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [1, 2, 3, 4, 5, 6, 7, 8, 11, 14, 17, 18]
            },
            {
                ordem: 2,               
                livro: "1tm",                  
                capitulo: 5,              
                verso_inicial: 1,            
                verso_final: 25,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [8]              
            }
        ]
    },


    {
        dia: 17,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 21,            
                verso_inicial: 1,       
                verso_final: 24,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [8]        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 26,              
                verso_inicial: 1,        
                verso_final: 12,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12],       
                versos_azuis: []
            },

            
            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 27,              
                verso_inicial: 1,        
                verso_final: 14,         
                versos_vermelhos: [],     
                versos_verdes: [6, 7, 8, 9, 10, 11, 12],       
                versos_azuis: [1, 3, 4, 5, 13, 14]
            },



        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 4,            
                verso_inicial: 1,       
                verso_final: 16,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [6, 9, 10, 11, 12, 13]
            },
            {
                ordem: 2,               
                livro: "1tm",                  
                capitulo: 6,              
                verso_inicial: 1,            
                verso_final: 21,                
                versos_vermelhos: [],    
                versos_verdes: [15, 16],    
                versos_azuis: [6, 7, 11, 14, 17, 21]              
            }
        ]
    },

      
     
    {
        dia: 18,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 22,            
                verso_inicial: 1,       
                verso_final: 33,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 28,              
                verso_inicial: 1,        
                verso_final: 9,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6, 7, 8, 9],       
                versos_azuis: []
            },

            
            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 29,              
                verso_inicial: 1,        
                verso_final: 11,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2],       
                versos_azuis: [10, 11]
            },



        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 5,            
                verso_inicial: 1,       
                verso_final: 20,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [2, 7, 10]
            },
            {
                ordem: 2,               
                livro: "2tm",                  
                capitulo: 1,              
                verso_inicial: 1,            
                verso_final: 18,                
                versos_vermelhos: [],    
                versos_verdes: [3, 4],    
                versos_azuis: [7, 12]              
            }
        ]
    },

   
    {
        dia: 19,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 23,            
                verso_inicial: 1,       
                verso_final: 44,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 30,              
                verso_inicial: 1,        
                verso_final: 12,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 8, 9, 10, 11, 12],       
                versos_azuis: [5, 6, 7]
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 6,            
                verso_inicial: 1,       
                verso_final: 12,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: []
            },
            {
                ordem: 2,               
                livro: "2tm",                  
                capitulo: 2,              
                verso_inicial: 1,            
                verso_final: 26,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [1, 3, 4, 5, 11, 12, 13, 15, 19, 24, 25, 26]              
            }
        ]
    },
   

    {
        dia: 20,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 24,            
                verso_inicial: 1,       
                verso_final: 23,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 31,              
                verso_inicial: 1,        
                verso_final: 24,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5, 6, 7,, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],       
                versos_azuis: [24]
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 7,            
                verso_inicial: 1,       
                verso_final: 29,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [5, 8, 13, 14, 19, 25, 29]
            },
            {
                ordem: 2,               
                livro: "2tm",                  
                capitulo: 3,              
                verso_inicial: 1,            
                verso_final: 17,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [11, 12, 16, 17]              
            }
        ]
    },




    {
        dia: 21,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 25,            
                verso_inicial: 1,       
                verso_final: 55,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [17, 38]        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 32,              
                verso_inicial: 1,        
                verso_final: 12,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: [1, 2, 5, 6, 7, 10, 11]
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 8,            
                verso_inicial: 1,       
                verso_final: 17,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [12]
            },
            {
                ordem: 2,               
                livro: "2tm",                  
                capitulo: 4,              
                verso_inicial: 1,            
                verso_final: 22,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [2, 8, 17, 18, 22]              
            }
        ]
    },

    {
        dia: 22,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 26,            
                verso_inicial: 1,       
                verso_final: 46,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 33,              
                verso_inicial: 1,        
                verso_final: 22,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 5],       
                versos_azuis: [9, 11, 18, 19, 20, 21, 22]
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 9,            
                verso_inicial: 1,       
                verso_final: 18,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [4, 8, 10, 11]
            },
            {
                ordem: 2,               
                livro: "tt",                  
                capitulo: 1,              
                verso_inicial: 1,            
                verso_final: 16,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [4]              
            }
        ]
    },




    {
        dia: 23,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "lv",            
                capitulo: 27,            
                verso_inicial: 1,       
                verso_final: 34,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 34,              
                verso_inicial: 1,        
                verso_final: 22,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3],       
                versos_azuis: [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 10 ,           
                verso_inicial: 1,       
                verso_final: 20,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: []
            },
            {
                ordem: 2,               
                livro: "tt",                  
                capitulo: 2,              
                verso_inicial: 1,            
                verso_final: 15,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [1, 7, 11, 14]              
            }
        ]
    },





    {
        dia: 24,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "nm",            
                capitulo: 1,            
                verso_inicial: 1,       
                verso_final: 54,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 35,              
                verso_inicial: 1,        
                verso_final: 28,         
                versos_vermelhos: [],
                versos_verdes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],   
                versos_azuis: []
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 11,            
                verso_inicial: 1,       
                verso_final: 10,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [5, 9, 10]
            },
            {
                ordem: 2,               
                livro: "tt",                  
                capitulo: 3,              
                verso_inicial: 1,            
                verso_final: 15,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [4, 5, 6, 7, 15]              
            }
        ]
    },


    {
        dia: 25,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "nm",            
                capitulo: 2,            
                verso_inicial: 1,       
                verso_final: 34,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [34]        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 36,              
                verso_inicial: 1,        
                verso_final: 12,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: [5, 6, 7, 8, 9, 10]
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ec",            
                capitulo: 12,            
                verso_inicial: 1,       
                verso_final: 14,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [1, 13]
            },
            {
                ordem: 2,               
                livro: "fm",                  
                capitulo: 1,              
                verso_inicial: 1,            
                verso_final: 25,                
                versos_vermelhos: [],    
                versos_verdes: [4, 5, 6, 22],    
                versos_azuis: [3, 25]              
            }
        ]
    },


    {
        dia:26,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "nm",            
                capitulo: 3,            
                verso_inicial: 1,       
                verso_final: 51,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 37,              
                verso_inicial: 1,        
                verso_final: 40,         
                versos_vermelhos: [],     
                versos_verdes: [],       
                versos_azuis: [3, 4, 5, 6, 7, 8, 9, 11, 17, 18, 19, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 34, 37, 39, 40]
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ct",            
                capitulo: 1,            
                verso_inicial: 1,       
                verso_final: 17,        
                versos_vermelhos: [],   
                versos_verdes: [3, 16],      
                versos_azuis: [15]
            },
            {
                ordem: 2,               
                livro: "hb",                  
                capitulo: 1,              
                verso_inicial: 1,            
                verso_final: 14,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: []              
            }
        ]
    },




    {
        dia: 27,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "nm",            
                capitulo: 4,            
                verso_inicial: 1,       
                verso_final: 49,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 38,              
                verso_inicial: 1,        
                verso_final: 22,         
                versos_vermelhos: [],     
                versos_verdes: [1, 2, 3, 4, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],       
                versos_azuis: []
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ct",            
                capitulo: 2,            
                verso_inicial: 1,       
                verso_final: 17,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [10, 14, 16]
            },
            {
                ordem: 2,               
                livro: "hb",                  
                capitulo: 2,              
                verso_inicial: 1,            
                verso_final: 18,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [1, 9, 10, 11, 14, 15, 17, 18]              
            }
        ]
    },




    {
        dia: 28,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "nm",            
                capitulo: 5,            
                verso_inicial: 1,       
                verso_final: 31,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 39,              
                verso_inicial: 1,        
                verso_final: 13,         
                versos_vermelhos: [],     
                versos_verdes: [4, 8, 9, 10, 11, 12, 13],       
                versos_azuis: []
            },

            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ct",            
                capitulo: 3,            
                verso_inicial: 1,       
                verso_final: 11,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: []
            },
            {
                ordem: 2,               
                livro: "hb",                  
                capitulo: 3,              
                verso_inicial: 1,            
                verso_final: 19,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [7, 8, 12, 13]              
            }
        ]
    },

    {
        dia: 29,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "nm",            
                capitulo: 6,            
                verso_inicial: 1,       
                verso_final: 27,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: [8, 23, 24, 24, 25]        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 40,              
                verso_inicial: 1,        
                verso_final: 17,         
                versos_vermelhos: [],     
                versos_verdes: [ 9, 10, 11, 12, 13, 14, 15, 16, 17],       
                versos_azuis: [1, 2, 3, 4]
            },

            
            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 41,              
                verso_inicial: 1,        
                verso_final: 13,         
                versos_vermelhos: [],     
                versos_verdes: [ 4, 10, 11, 12],       
                versos_azuis: [1, 2, 3]
            },


            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ct",            
                capitulo: 4,            
                verso_inicial: 1,       
                verso_final: 16,        
                versos_vermelhos: [],   
                versos_verdes: [],      
                versos_azuis: [1, 7, 12]
            },
            {
                ordem: 2,               
                livro: "hb",                  
                capitulo: 4,              
                verso_inicial: 1,            
                verso_final: 16,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [3, 12, 13, 14, 15, 16]              
            }
        ]
    },

    {
        dia: 30,      
        mes: 4,      
        leitura_familia: [ 
            {
                ordem: 1,               
                livro: "nm",            
                capitulo: 7,            
                verso_inicial: 1,       
                verso_final: 89,        
                versos_vermelhos: [], 
                versos_verdes: [],    
                versos_azuis: []        
            },

            {
                ordem: 2,               
                livro: "sl",              
                capitulo: 42,              
                verso_inicial: 1,        
                verso_final: 11,         
                versos_vermelhos: [],     
                versos_verdes: [ 6, 9],       
                versos_azuis: [1, 2, 5, 8, 11]
            },

            
            {
                ordem: 3,               
                livro: "sl",              
                capitulo: 43,              
                verso_inicial: 1,        
                verso_final: 5,         
                versos_vermelhos: [],     
                versos_verdes: [ 1, 2, 3, 4],       
                versos_azuis: [5]
            },


            
           

        ],
        leitura_pessoal: [
            {
                ordem: 1,               
                livro: "ct",            
                capitulo: 5,            
                verso_inicial: 1,       
                verso_final: 16,        
                versos_vermelhos: [],   
                versos_verdes: [16],      
                versos_azuis: []
            },
            {
                ordem: 2,               
                livro: "hb",                  
                capitulo: 5,              
                verso_inicial: 1,            
                verso_final: 14,                
                versos_vermelhos: [],    
                versos_verdes: [],    
                versos_azuis: [8, 9]              
            }
        ]
    },
]


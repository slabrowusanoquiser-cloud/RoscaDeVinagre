const ingredients = [
  {name:'Ovos', amount:3, unit:'un.'},
  {name:'Açúcar', amount:1, unit:'xícara de chá'},
  {name:'Óleo', amount:3, unit:'colheres rasas de sopa'},
  {name:'Vinagre de álcool', amount:3, unit:'colheres de sopa'},
  {name:'Fermento em pó', amount:1, unit:'colher de sopa'},
  {name:'Farinha de trigo', amount:4, unit:'xícaras (aprox.)'}
];
const list = document.querySelector('#ingredientList');
function format(n){return Number.isInteger(n)?n:String(n).replace('.',',')}
function renderIngredients(mult=1){
  list.innerHTML = ingredients.map(i=>`<li><span>${i.name}</span><span>${format(i.amount*mult)} ${i.unit}</span></li>`).join('');
}
document.querySelectorAll('.portion').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.portion').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active'); renderIngredients(Number(btn.dataset.mult));
}));
renderIngredients();

const steps = [
  {title:'Mistura inicial dos ingredientes', img:'assets/mistura.png', text:'Primeiro, os ingredientes são colocados em um recipiente e misturados. Depois, a farinha de trigo é acrescentada aos poucos, enquanto a mistura é mexida continuamente. Nessa etapa, a massa começa a ganhar consistência.'},
  {title:'Formação da massa', img:'assets/massa.png', text:'Quando a mistura fica mais pesada, o preparo passa a ser feito com as mãos. A massa é trabalhada até ficar mais uniforme, macia e firme o suficiente para ser modelada sem se desfazer.'},
  {title:'Modelagem das rosquinhas', img:'assets/modelagem.png', text:'Com a massa pronta, pequenas porções são separadas. Cada pedaço é enrolado e moldado em formato circular, unindo as pontas para formar as rosquinhas.'},
  {title:'Processo de fritura', img:'assets/fritura.png', text:'As rosquinhas modeladas são colocadas com cuidado no óleo quente. Durante a fritura, elas mudam de cor e ficam mais firmes, até atingirem uma aparência dourada.'},
  {title:'Retirada e finalização', img:'assets/prontas.png', text:'Quando atingem o ponto desejado, as rosquinhas são retiradas do óleo e colocadas em um recipiente para escorrer o excesso e começar a esfriar.'},
  {title:'Resultado final', img:'assets/interior.png', text:'Depois de prontas, as rosquinhas apresentam uma parte externa dourada e mais firme, enquanto o interior permanece mais macio. Assim, ficam prontas para servir.'}
];
let stepIndex=0;
const tabs=document.querySelector('#stepTabs');
tabs.innerHTML=steps.map((s,i)=>`<button class="step-tab ${i===0?'active':''}" data-i="${i}">${String(i+1).padStart(2,'0')} ${s.title.split(' ')[0]}</button>`).join('');
function renderStep(i){stepIndex=i; const s=steps[i]; document.querySelector('#stepImage').src=s.img; document.querySelector('#stepNumber').textContent=String(i+1).padStart(2,'0'); document.querySelector('#stepTitle').textContent=s.title; document.querySelector('#stepText').textContent=s.text; document.querySelectorAll('.step-tab').forEach((b,j)=>b.classList.toggle('active',j===i));}
tabs.addEventListener('click',e=>{const b=e.target.closest('.step-tab'); if(b) renderStep(Number(b.dataset.i));});
document.querySelector('#prevStep').onclick=()=>renderStep((stepIndex-1+steps.length)%steps.length);
document.querySelector('#nextStep').onclick=()=>renderStep((stepIndex+1)%steps.length);
renderStep(0);

const chemistry=[
  {name:'Farinha de trigo',emoji:'🌾',hint:'Amido',text:'É rica em amido, um carboidrato. Quando entra em contato com os líquidos da receita, participa da formação e da estrutura da massa.'},
  {name:'Açúcar',emoji:'◇',hint:'Sacarose',text:'É composto principalmente por sacarose. Além de adoçar, ajuda a construir o sabor final da rosquinha.'},
  {name:'Óleo',emoji:'💧',hint:'Lipídios',text:'É formado principalmente por lipídios. Na fritura, o óleo transfere calor para a massa e participa da mudança de textura.'},
  {name:'Vinagre',emoji:'🧪',hint:'Ácido acético',text:'O vinagre contém principalmente água e ácido acético. É um ingrediente ácido e entra na mistura da massa.'},
  {name:'Fermento',emoji:'◌',hint:'Liberação de gás',text:'O fermento participa da formação de gases na massa, ajudando na mudança de volume e textura durante o preparo.'},
  {name:'Ovos',emoji:'🥚',hint:'Proteínas',text:'Os ovos ajudam a ligar os ingredientes e contribuem para a estrutura da massa durante o preparo.'}
];
const chemGrid=document.querySelector('#chemGrid');
chemGrid.innerHTML=chemistry.map(c=>`<div class="chem-card"><div class="chem-inner"><div class="chem-face chem-front"><div><div class="emoji">${c.emoji}</div><h3>${c.name}</h3></div><small>${c.hint} · clique para virar</small></div><div class="chem-face chem-back"><p>${c.text}</p></div></div></div>`).join('');
chemGrid.addEventListener('click',e=>{const card=e.target.closest('.chem-card'); if(card) card.classList.toggle('flipped')});

const molecules=[
  {icon:'🌾',title:'Farinha de trigo',small:'Presente na farinha',text:'O amido está presente na farinha usada para preparar a receita.'},
  {icon:'🥣',title:'Massa',small:'Misturado aos ingredientes',text:'Ao preparar a massa, o amido passa a fazer parte da mistura das rosquinhas.'},
  {icon:'🍩',title:'Rosquinha pronta',small:'Consumido no alimento',text:'Depois de frita, a rosquinha ainda contém os carboidratos vindos da farinha.'},
  {icon:'🧬',title:'Digestão',small:'Quebra dos carboidratos',text:'Durante a digestão, o amido começa a ser quebrado em partes menores.'},
  {icon:'⬡',title:'Glicose',small:'Formação de glicose',text:'A quebra dos carboidratos resulta em moléculas menores, incluindo glicose.'},
  {icon:'⚡',title:'Sangue e células',small:'Energia para o corpo',text:'A glicose absorvida chega ao sangue e pode ser usada pelas células como fonte de energia.'}
];
const mp=document.querySelector('#moleculePath'), md=document.querySelector('#moleculeDetail');
mp.innerHTML=molecules.map((m,i)=>`<button class="mol-step ${i===0?'active':''}" data-i="${i}"><div class="mol-icon">${m.icon}</div><b>${i+1}. ${m.title}</b><span>${m.small}</span></button>`).join('');
function renderMol(i){document.querySelectorAll('.mol-step').forEach((x,j)=>x.classList.toggle('active',j===i)); const m=molecules[i]; md.innerHTML=`<h3>${m.title}</h3><p>${m.text}</p>`}
mp.addEventListener('click',e=>{const b=e.target.closest('.mol-step');if(b)renderMol(Number(b.dataset.i))}); renderMol(0);

const quiz=[
 {q:'Qual ingrediente é adicionado aos poucos até a massa dar o ponto?',opts:['Óleo','Farinha de trigo','Vinagre'],a:1,why:'A farinha é acrescentada aos poucos até a massa ficar firme o bastante para enrolar.'},
 {q:'Qual formato é dado à massa antes da fritura?',opts:['Quadrado','Triângulo','Rosquinha/anel'],a:2,why:'A massa é enrolada e as pontas são unidas, formando rosquinhas.'},
 {q:'O que acontece durante a fritura?',opts:['A massa fica dourada e mais firme','A massa vira líquida','A farinha desaparece'],a:0,why:'O aquecimento muda a textura e a cor da massa.'},
 {q:'Qual componente da farinha foi escolhido para a “viagem de uma molécula”?',opts:['Amido','Sal','Água'],a:0,why:'A jornada acompanha o amido da farinha.'},
 {q:'Onde ocorre grande parte da absorção dos nutrientes?',opts:['Esôfago','Intestino delgado','Boca'],a:1,why:'O intestino delgado é uma etapa importante da absorção de nutrientes.'}
];
let qi=0,score=0,answered=false; const qQ=document.querySelector('#quizQuestion'),qO=document.querySelector('#quizOptions'),qF=document.querySelector('#quizFeedback'),qN=document.querySelector('#quizNext');
function renderQuiz(){answered=false;qN.disabled=true;qF.textContent='';document.querySelector('#quizCount').textContent=`Pergunta ${qi+1} de ${quiz.length}`;document.querySelector('#quizBar').style.width=`${((qi+1)/quiz.length)*100}%`;qQ.textContent=quiz[qi].q;qO.innerHTML=quiz[qi].opts.map((o,i)=>`<button class="quiz-option" data-i="${i}">${o}</button>`).join('');qN.textContent=qi===quiz.length-1?'Ver resultado':'Próxima'}
qO.addEventListener('click',e=>{const b=e.target.closest('.quiz-option');if(!b||answered)return;answered=true;const chosen=Number(b.dataset.i),correct=quiz[qi].a;document.querySelectorAll('.quiz-option').forEach((x,i)=>{if(i===correct)x.classList.add('correct');else if(i===chosen)x.classList.add('wrong')});if(chosen===correct){score++;qF.textContent='Acertou! '+quiz[qi].why}else qF.textContent='Quase! '+quiz[qi].why;qN.disabled=false});
qN.onclick=()=>{if(qi<quiz.length-1){qi++;renderQuiz()}else{document.querySelector('#quizCard').innerHTML=`<div class="quiz-result"><span class="eyebrow">RESULTADO</span><h3>${score}/${quiz.length} acertos</h3><p>${score===quiz.length?'Mandou muito bem — fechou o quiz!':score>=3?'Boa! Você pegou a maior parte do conteúdo.':'Vale revisar as etapas mais uma vez 😄'}</p><button class="btn primary" onclick="location.reload()">Refazer</button></div>`}};renderQuiz();

const modal=document.querySelector('#imageModal'); document.querySelector('#openBodyModal').onclick=()=>modal.showModal(); document.querySelector('#closeModal').onclick=()=>modal.close(); modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
const menuBtn=document.querySelector('#menuBtn'),nav=document.querySelector('#navMenu');menuBtn.onclick=()=>nav.classList.toggle('open');nav.addEventListener('click',()=>nav.classList.remove('open'));
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

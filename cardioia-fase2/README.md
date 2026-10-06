# CardioIA – Fase 2: Diagnóstico Automatizado (IA no Estetoscópio Digital)

Projeto acadêmico da disciplina de Inteligência Artificial (FIAP) – *Cap. 1 – Desafio Integrador: IA entre Robôs, Sinapses e Medicina*.

Nesta fase, o CardioIA usa **NLP e classificação de texto** para (1) extrair sintomas de relatos de pacientes e sugerir possíveis diagnósticos e (2) classificar o **nível de risco** de um relato (alto/baixo).

> ⚠️ **Aviso:** projeto estritamente acadêmico, com dados **simulados**. Não substitui avaliação médica.

## 🎥 Vídeo de demonstração

https://youtu.be/PlEVXTk_HYA

## 👥 Integrantes

| Integrante | RM |
|---|---|
| Adrison Magalhães | RM568165 |
| Anna Carolina Martins Souza | RM566692 |
| Juan Battagin Barrocal | RM567410 |
| Marcela Amorim Fernandes | RM566995 |

## 📁 Estrutura do repositório

```
.
├── frases_sintomas.txt        # 10 relatos simulados de pacientes
├── mapa_conhecimento.csv      # Sintoma 1 | Sintoma 2 | Doença Associada (37 regras)
├── diagnostico.ipynb          # Parte 1: extração de sintomas + sugestão de diagnóstico
├── classificador_risco.csv    # 40 frases rotuladas (20 alto risco / 20 baixo risco)
├── classificador.ipynb        # Parte 2: TF-IDF + classificador + avaliação
└── README.md
```

## ▶️ Como executar

```bash
pip install pandas scikit-learn jupyter
jupyter notebook
```
Abra `diagnostico.ipynb` e `classificador.ipynb` e execute as células em ordem (os arquivos `.txt` e `.csv` devem estar na mesma pasta dos notebooks).

## 🧩 Parte 1 – Frases de sintomas e extração de informações

- **`frases_sintomas.txt`**: 10 relatos completos, com tempo de início, intensidade e contexto (ex.: *"Há dois dias estou com uma forte dor no peito que piora quando faço esforço físico."*).
- **`mapa_conhecimento.csv`**: associa expressões comuns a doenças (Infarto, Angina, Insuficiência Cardíaca, Taquicardia, Arritmia, Hipotensão e Hipertensão). Separador `;`.
- **`diagnostico.ipynb`**: lê as frases, normaliza o texto (minúsculas, sem acentos), localiza os sintomas do mapa, **soma as evidências por doença** e sugere o diagnóstico mais provável, listando também as hipóteses alternativas.

Exemplo de resultado:

| Paciente | Sintomas identificados | Diagnóstico sugerido |
|---|---|---|
| 1 | dor no peito, esforço | Angina |
| 8 | dor no peito, suor frio | Infarto |
| 10 | cansaço, falta de ar, dormir quando estou deitado | Insuficiência Cardíaca |

## 🧠 Parte 2 – Classificador básico de texto (risco)

- **`classificador_risco.csv`**: 40 frases rotuladas (`frase;situacao`), equilibradas entre *alto risco* e *baixo risco*.
- **`classificador.ipynb`**: divisão treino/teste (70/30 estratificada) → **TF-IDF** (unigramas e bigramas) → **Regressão Logística** (comparada com Árvore de Decisão) → acurácia, relatório de classificação, matriz de confusão, **validação cruzada** e análise das palavras mais influentes.

| Modelo | Acurácia (teste, 12 frases) |
|---|---|
| Regressão Logística | 100% (validação cruzada 5 partes: ~92,5%) |
| Árvore de Decisão | 75% |

## ⚖️ Governança de dados, limitações e vieses

- Todos os textos são **simulados**: nenhum dado real de paciente foi usado, evitando problemas de privacidade (LGPD).
- A base é pequena e escrita por poucas pessoas; os 100% de acurácia **não** indicam desempenho real.
- O classificador não entende **negação** ("não sinto dor no peito" → alto risco) e reage a palavras isoladas ("dor de cabeça" → alto risco).
- A linguagem simulada não cobre a diversidade de falas de pacientes reais (regionalismos, escolaridade), o que pode gerar viés.
- Em um sistema real: base grande e validada por profissionais de saúde, foco em recall do alto risco e **sempre supervisão humana**.

## 🔗 Fase 1

Repositório da Fase 1 (dados numéricos, textuais e visuais): https://github.com/MarcelaFernandes-IA/cardioia-fase1-batimentos-de-dados

# CardioIA – Ir Além 2: Diagnóstico visual de ECG com rede neural (MLP)

Notebook que treina uma **rede neural MLP (Keras)** para classificar batimentos de ECG como **normal** ou **anormal**, usando **imagens em tons de cinza** geradas a partir do dataset público recomendado no enunciado.

> ⚠️ Projeto acadêmico. Não substitui avaliação médica.

## 🎥 Vídeo de demonstração

**[ADICIONAR AQUI O LINK DO YOUTUBE (NÃO LISTADO)]**

## 👥 Integrantes

| Integrante | RM |
|---|---|
| Adrison Magalhães | RM568165 |
| Anna Carolina Martins Souza | RM566692 |
| Juan Battagin Barrocal | RM567410 |
| Marcela Amorim Fernandes | RM566995 |

## 📦 Dataset

[Heartbeat – Kaggle (Shayan Fazeli)](https://www.kaggle.com/datasets/shayanfazeli/heartbeat) (batimentos do MIT-BIH). Os arquivos usados são `mitbih_train.csv` e `mitbih_test.csv`: cada linha tem 187 valores do sinal e um rótulo (0 = normal; 1 a 4 = tipos de batimento anormal). Transformamos o problema em **binário** (normal × anormal). Os CSVs **não** estão neste repositório (são grandes); o notebook baixa via `kagglehub` ou você pode baixá-los do Kaggle e colocá-los na mesma pasta do notebook.

## ▶️ Como executar

**Opção 1 – Google Colab (mais fácil):** envie `ecg_mlp.ipynb` para o Colab, execute as células em ordem (o TensorFlow já vem instalado). Se o download automático falhar, arraste `mitbih_train.csv` e `mitbih_test.csv` para o painel de arquivos.

**Opção 2 – Local:**
```bash
pip install -r requirements.txt
jupyter notebook ecg_mlp.ipynb
```

## 🧪 O que o notebook faz

1. **Carrega** os CSVs e converte os rótulos em normal/anormal.
2. **Pré-processa**: cada batimento vira uma **imagem 64×64 em tons de cinza** (tamanho fixo e um único canal), com pixels normalizados para 0–1 dentro do modelo. Há também uma função opcional para ler **imagens reais de ECG** em pastas (`normal/` e `anormal/`), convertendo para cinza e redimensionando.
3. **Balanceia o treino** (mesma quantidade de normais e anormais) e **testa no arquivo de teste completo**.
4. **Cria o MLP** com Keras: `Rescaling → Flatten → Dense(256) → Dropout → Dense(128) → Dropout → Dense(1, sigmoid)`.
5. **Treina** com validação e `EarlyStopping`.
6. **Avalia**: acurácia, precisão/recall/F1, matriz de confusão, curvas de aprendizado e exemplos de acertos e erros.

## 📊 Resultados

> Preencha com os números da sua execução (a última célula do notebook imprime o resumo):
>
> - Acurácia no teste: **[__ %]**
> - Recall do "anormal": **[__ %]**
> - Precisão do "anormal": **[__ %]**

## ⚖️ Limitações e ética

- O MLP trata a imagem como vetor e ignora a vizinhança dos pixels; uma CNN tende a ir melhor.
- Treino balanceado × teste desbalanceado: olhe recall e precisão, não só a acurácia.
- Dados de poucos pacientes (MIT-BIH): possível viés de representatividade.
- A IA **apoia**, nunca substitui, o julgamento do profissional de saúde.

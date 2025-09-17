# Escopo do Projeto
>Equipe: Raphael Aaron - 564067; Felipe Catto - 562106; Kimberly Kristina - 564080; Laura Dantas - 564064

>Link vídeo: https://youtu.be/P7jWxm13_Nk

O Passa a Bola tem enfrentado grandes desafios relacionados à desinformação do público em relação ao futebol feminino e a falta de integração da comunidade. A ausência de espaços digitais dedicados a esse tema dificulta o fortalecimento do engajamento e a disseminação de informações confiáveis.
Pensando em solucionar tais problemas, nós da Unlimit Tech Solution, pensamos no desenvolvimento de um app (MVP web) com funcionalidades semelhantes a um rede social, permitindo a criação de posts curtos, os quais permitem a interação entre os usuários. O diferencial da solução está na integração de um chatbot especializado em futebol feminino, capaz de responder dúvidas dos usuários sobre regras, campeonatos, times, jogadoras e história do esporte.
Os principais objetivos do projeto envolvem:
- Fortalecimento da comunidade;
- Combate à desinformação;
- Experiência do usuário intuitiva;
- Escalabilidade e relevância;
- Valorização do futebol feminino.

# Atores do sistema
Atores são os usuários e/ou outros meios externos que desempenham algum tipo de papel em relação ao sistema. Dentro do cenário do projeto, há:
- Usuário Registrado: pode criar posts, comentar, curtir, seguir perfis e interagir com o chatbot.
- Administrador: modera conteúdos, gerencia usuários e acompanha métricas.
- Chatbot Futebol Feminino: responde dúvidas sobre regras, times, jogadoras e campeonatos.

> Dentro do projeto o usuário é o foco da experiência, o administrador garante o bom funcionamento do aplicativo e o chat agrega conhecimento sobre o que está acontecendo no mundo do futebol feminino.

# Arquitetura IoT
<img width="361" height="514" alt="Edge - diagrama" src="https://github.com/user-attachments/assets/8168980d-a44c-44e6-a7f4-ed9d2a6285eb" />

# Explicando a arquitetura 
## Camada IoT
- Usuários Mobile / Web App (postagens, likes, comentários, chatbot)
- Chatbot (NLP/IA) integrado como um "dispositivo lógico" que também publica/recebe via MQTT.
- Sensores Virtuais (poderiam simular interações da comunidade, ex.: contagem de posts, métricas em tempo real).

## Camada Back-End
- MQTT Broker (porta 1883) → responsável por gerenciar os tópicos: posts/publicar; posts/notificações; chatbot/perguntas; chatbot/respostas.
- IoT Agent MQTT: traduz mensagens MQTT para o Orion Context Broker (NGSI v2).
- Orion Context Broker: gerencia o contexto (posts, usuários, sessões de chat).
- MongoDB Internal: armazena dados atuais (estado de posts, usuários online, últimas interações).
- STH-Comet + MongoDB Historical: mantém histórico de posts, engajamento e conversas.

## Camada Application
- Mobile App (React Native / Web): interface onde a comunidade interage.
- Dashboard de Analytics: análise de engajamento (número de posts, tópicos mais discutidos, perguntas mais comuns ao chatbot).
- AI / Machine Learning: motor de NLP do Chatbot (treinado para dúvidas sobre futebol).

# Fluxo 
1. Usuário posta algo → app envia via MQTT (posts/publicar) → IoT Agent → Orion → DB.
2. Outro usuário recebe notificação em tempo real via MQTT (posts/notificacoes).
3. Usuário pergunta algo ao chatbot → mensagem MQTT (chatbot/perguntas) → IA responde → resposta publicada em (chatbot/respostas).
4. Histórico (engajamento, posts, uso do chatbot) armazenado no MongoDB Histórico.

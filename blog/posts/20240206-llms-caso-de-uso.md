# LLMs: Caso de Uso

*TLDR: Trabajamos en la implementacion de LLMs, Vector DB y RAG para elMejorTrato.com. Concluimos que:*
- *Trabajar con lenguaje español tiene sus trucos*
- *La API de ChatGPT es demasiado costosa*
- *LangChain y los agentes son a veces un overkill*
- *Con SentenceBert y una VectorDB se pueden hacer maravillas*
- *Los LLMs open source cuantizados dan muy buenos resultados*

_**Dejamos [aqui el codigo base](https://github.com/amiune/genai-stack/) open source dockerizado para que lo puedan utilizar en sus proyectos**_

### Creando un prototipo

Los Large Language Models que adquirieron popularidad a partir de que ChatGPT fuera puesto a disposicion del publico en general han generado furor en los posibles usos que pueda tener a futuro. 
Hay muchos ejemplos de usos de los LLMs que intentan simular Inteligencia Artificial General y que realmente parecen del futuro.
Aqui nos concentraremos en el uso de LLMs para un caso concreto en el sitio web de elMejorTrato.com.

Los LLMs introdujeron dos novedades increibles para los desarrolladores de software:
1. La posibilidad de interpretar lenguaje natural.
2. La posibilidad de hacer busquedas vectoriales sobre texto, audio e imagenes.

Un ejemplo concreto de elMejorTrato.com era que al darle al usuario la posibilidad de ingresar el monto del prestamo que deseaba buscar el usuario en vez de ingresar un numero ingresaba un texto como "Necesito $10.000 para ampliar mi casa". La solucion fue reemplazar un cuadro de texto por un select box. Hoy con la posibilidad de interpretar lenguaje natural que brindan los LLMs se puede capturar mejor la interaccion y brindarle un mejor servicio a los usuarios.

Un segundo ejemplo es la posibilidad de contestarle dudas a los usuarios que ya han sido respondidas para otros usuarios mediante el uso de las busquedas vectoriales sobre texto utilizando embeddings generados por el LLM.

Para probar estas nuevas soluciones creamos un prototipo a partir de un [fork](https://github.com/amiune/genai-stack) de este muy buen [template](https://github.com/docker/genai-stack) de docker con las siguientes adaptaciones:
- Prompt para que llama2 funcione correctamente en español.
- Modelo de embedding de bert en español de la [Universidad de Chile](https://huggingface.co/dccuchile/bert-base-spanish-wwm-cased).
- [Weaviate](https://weaviate.io/) como base de datos para poder hacer busquedas hibridas (vector, texto) y ademas poder utilizarla local o cloud.
- Simplificacion del codigo para que sea más fácil entenderlo y adaptarlo a tu proyecto.


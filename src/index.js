import api from './api';

class App {
    constructor() {
        this.login = document.getElementById("page_login");
        this.page_cadastro = document.getElementById("page_cadastro");
        this.page_dashboard = document.getElementById("page_dash");
        this.html_dashboard = document.getElementById("data");
        this.page_cadastroGrowdever = document.getElementById("form_dash");
        this.botoes()
        this.token = "";
        this.uid = "";
    }

    botoes(){
        document.getElementById("btn_login").onclick = () => {
            this.validacao()
        }
        document.getElementById("criarConta").onclick = () => {
            this.criarConta();
        }
        document.getElementById("createUser").onclick = () => {
            this.criarUsuario()
        }
        document.getElementById("logout").onclick = () => {
            this.logout()
        }
        document.getElementById("growdevTeam").onclick = () => {
            this.homePage()
        }
    }

    validacao() {
        const username = document.getElementById("inputUsername").value;
        const senha = document.getElementById("inputPassword").value;

        api.post('/login', {
            "username": username,
            "password": senha
        }).then(r => {
            const { success, token } = r.data;

            if (success) {
                this.login.style.display = "none",
                this.page_dashboard.style.display = "block"
                this.token = token;
                this.uid = r.data.user.uid;
                document.getElementById("data_growdevers").style.display = "block"
                this.buscaGrowdevers();
            }

        })
            .catch(e => alert(e));
    }

    buscaGrowdevers(){
        const username = document.getElementById("inputUsername").value = "";
        const password = document.getElementById("inputPassword").value = "";
        api.getAutenticado('/growdevers', this.token)
            .then(r => {
                this.html_dashboard = "";
                let contador = 1;
                r.data.growdevers.forEach((gd) => {
                    this.html_dashboard += `
                        <tr>
                            <td>${contador}</td>
                            <td>${gd.user.name}</td>
                            <td>${gd.email}</td>
                            <td>${gd.phone}</td>
                            <td>${gd.program}</td>
                        </tr>
                    `
                    contador++;
                    document.getElementById("data").innerHTML = this.html_dashboard;
                });
            });
    }


    criarConta() {
        this.login.style.display = "none";
        this.page_cadastro.style.display = "block";
        
        this.btn_criar = document.getElementById("btn_criar").onclick = (event) => {
            
        this.email = document.getElementById("createName").value;
        this.senha = document.getElementById("createPassword").value;
        this.username = document.getElementById("createUsername").value;
        this.tipo = document.getElementById("tipo").value;
        
          
        api.post('/users', {
                "name": this.email,
                "password": this.senha,
                "type": this.tipo,
                "username": this.username
              }).then(r => alert(r.data.message),
              this.login.style.display = "block",
              this.page_cadastro.style.display = "none")
                .catch (e => alert(e.response.data.message));
    }
}

    criarUsuario() {       
    document.getElementById("data_growdevers").style.display = "none";
    document.getElementById("form_data").style.display = "block";

    
    document.getElementById("btn_createGrowdever").onclick = () => {
        const email = document.getElementById("createEmail").value;
        const phone = document.getElementById("createTel").value;
        const programa = document.getElementById("createProgram").value;
        api.postAutenticado('/growdevers', {
            "email": email,
            "phone": phone,
            "program": programa,
            "user_uid": this.uid
        },  this.token).then(r => {
            console.log(r)})
            .catch(e => alert(e.response.data.message));
    }
}

    homePage(){
        document.getElementById("data_growdevers").style.display = "block";
        document.getElementById("form_data").style.display = "none"
    }

    logout(){
        this.login.style.display = "block";
        this.page_dashboard.style.display = "none"
        document.getElementById("page_dash").style.display = "none";
        document.getElementById("form_data").style.display = "none";
        
    }
}

new App();
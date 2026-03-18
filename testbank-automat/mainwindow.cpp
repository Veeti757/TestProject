#include "mainwindow.h"
#include "./ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    manager = new QNetworkAccessManager(this);
    connect(ui->btnLogin,&QPushButton::clicked,this,&MainWindow::handleLogin);
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::handleLogin()
{
    QString username = ui->textUsername->text();
    QString password = ui->textPassword->text();
    QString url = environment::getBaseUrl()+"/login";
    QNetworkRequest request(url);
    request.setHeader(QNetworkRequest::ContentTypeHeader, "application/json");
    QJsonObject loginData;
    loginData.insert("username",username);
    loginData.insert("password",password);
    QJsonDocument jsonDoc(loginData);
    QNetworkReply * reply = manager->post(request,jsonDoc.toJson());
    connect(reply,&QNetworkReply::finished,this,[reply,this](){
        QByteArray responseData = reply->readAll();
        int status = reply->attribute(QNetworkRequest::HttpStatusCodeAttribute).toInt();
        qDebug() << status;
        if(status == 0 || status == 500)
        {
            ui->labelInfo->setText("virhe tietoliikenneyhteydessa");
        }
        else if(status == 400 || status == 401)
        {
            ui->labelInfo->setText("tunnus ja salasana eivät täsmää");
        }
        else
        {
            ui->labelInfo->setText("OK");
        }
        reply->deleteLater();
    });
}

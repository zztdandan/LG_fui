# Swallow开发平台使用手册

## 环境安装

+ JDK： 确保系统安装JDK8
+ Maven：需要Maven3+
+ IDE： eclipse Mars2或者IDEA，推荐使用IDEA
+ 版本控制： 为了更好团队协作，建议使用git进行版本控制管理。

## 柳钢内部提供的资源库

+ Nexus私服：这是一个我们内部提供的Maven仓库，主要存放内部开发的Java组件等，例如我们的平台jar包和脚手架就发布在上面。
+ gogs：这是一个内部提供的基于git的代码托管平台，与码云，gitlab,github等类似。内部开发的代码大部分托管在此，建议开发团队也使用该平台托管项目源代码。

## 开始使用

在确保上述的环境安装没有问题之后，可以开始使用我们的平台进行开发，以下会介绍我们使用到的一些技术以及其文档，这些也是我们建议您使用的；其次会介绍如何使用我们的代码托管平台和Nexus私服；最后将会介绍如何使用Swallow开始第一个Hello world项目。

### gogs平台使用

对于目前的使用，我们规定了，使用员工的工号作为账号，初始密码为123456，在第一次登陆之后，建议修改您的密码和完善您的个人信息。对于第一次使用的用户，目前并不提供注册功能，需要联系管理员(软一甘树禧)进行账号添加，添加完成之后即可登陆使用。

对于项目仓库创建，建议由项目经理进行仓库创建，对于版本控制的管理，目前主要有以下三种：

+ 组织 
+ 协作者
+ 提PR

使用组织，组织内成员可以对组织的项目进行读写操作，权限的作用范围比较大，协作者是对于一个项目，拥有者可以添加协作者，协作者对项目有读写操作。提PR是代码提交者如果需要提交代码，需要先提交pull request，由拥有者review代码之后再决定是合并还是打回。对应项目经理而言，如果对成员的代码风格，写法等都有比较严格的规定，建议使用提PR的模式，对项目成员代码进行review后，符合标准再合并，这样有利于整个项目的代码风格统一。如果成员之间都具备一定的默契，不需要项目经理进行review代码也能保证风格统一，那么建议使用协作者的或者组织的模式。

### Nexus的使用

首先先提一下Maven的settings.xml文件，我们建议该文件放置/用户/.m2/目录下，如果是Linux系统，则是/home/username/.m2，如果是Windows系统则是C:/用户/用户名/.m2下；在settings.xml内，请设置`<localRepository>`标签为本地Maven仓库的路径，如果不设置，默认则是在.m2/repository下。下面给出一个示例的settings.xml配置样例。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">

  <localRepository>your repo path</localRepository>
  <pluginGroups>
  </pluginGroups>
  <proxies>
  </proxies>
  <servers>

  </servers>
  <mirrors>
    <!-- 配置柳钢Nexus的镜像 -->
    <mirror>
      <id>nexus-aliyun</id>
      <mirrorOf>*</mirrorOf>
      <name>Nexus aliyun</name>
      <url>http://maven.aliyun.com/nexus/content/groups/public</url>
    </mirror> 

     <mirror>
      <id>nexus-lg</id>
      <mirrorOf>maven-public</mirrorOf>
      <name>Nexus lg</name>
      <url>http://172.16.4.191:8081/repository/maven-public/</url>
    </mirror> 
  </mirrors>
  <profiles>
    <!-- 配置JDK8 -->
    <profile>
      <id>jdk8</id>
      <activation>
        <activeByDefault>true</activeByDefault>
        <jdk>1.8</jdk>
      </activation>
      <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
        <maven.compiler.compilerVersion>1.8</maven.compiler.compilerVersion>
      </properties>
    </profile>

    <profile>
       <id>nexus</id>
       <repositories>
        <repository>
          <id>nexus-lg</id>
          <url>http://nexus-lg</url>
          <snapshots>
            <enabled>true</enabled>
          </snapshots>
         <releases>
            <enabled>true</enabled>
          </releases>
        </repository>
      </repositories>

      <pluginRepositories>
        <pluginRepository>
            <id>nexus-lg</id>
            <url>http://nexus-lg</url>
            <snapshots>
              <enabled>true</enabled>
            </snapshots>
            <releases>
              <enabled>true</enabled>
            </releases>
        </pluginRepository>
      </pluginRepositories>
    </profile>
  </profiles>
   <activeProfiles>
    <activeProfile>nexus</activeProfile>
  </activeProfiles>
</settings>
```

## IDE相关配置【建议】

工欲善其事必先利其器，我们在项目中使用到了不少便利的工具，但是这些工具是需要做一定配置的，我们建议使用者按照此修改下配置，这样可能能避免一些日后开发中遇到的奇怪问题(只是可能，比如说同样一段代码开启和不开启保留方法参数名编译其结果是完全不一样的，单从代码层面是开不出任何问题的),在下面的骨架工程生成中，我们默认也会给maven插件开启保留方法参数名编译。

+ lombok插件，项目中生成的代码(pojo)类均使用了lombok注解，为了让IDE支持，所以需要安装这个插件，eclipse和IDEA都支持的，在各自的插件资源库均可以安装。

+ 开启保留编译方法参数名。[请参考此处](http://www.mamicode.com/info-detail-2162647.html)

+ 统一编码和换行符。我们建议统一使用UTF-8编码格式和LF换行符(Unix风格)，在IDE中都可以设置的。

## 平台技术背景及技术栈

该平台是基于Spring全家桶进行开发的，主要依赖于Springboot2.1.0，原则上，任何主流技术，能与Spring技术进行整合的都可以在这里得到整合(如果我们没有进行整合进来的技术，有需求使用到的，可以进行技术评估后由业务团队进行自由整合)，只不过在Java这个大生态里面，技术体系实在是太多了，为了节约大家的宝贵时间，也为了得出一个规范化的操作，我们进行了一些技术的整合，基本上可以满足绝大部分的需求，因此，下面交代一下我们都整合了什么技术进去。

### 主体技术栈

+ ORM：[BeetlSQL](http://ibeetl.com/guide/#beetlsql)
+ 数据库连接池：Druid（我们使用druid-sprigboot-starter）
+ 工具类：[Hutool](http://hutool.mydoc.io/)
+ Json序列化：jackson（springboot默认使用的json序列化工具，如果项目中有需要对json操作，也可以使用hutool-json）
+ Servlet容器: undertow（内嵌式容器）

以上的技术栈都是很主流的技术，在互联网上都能获取到对应的文档进行参考。

## 第一个HelloWorld程序

下面我们来介绍一下，如果创建第一个HelloWorld程序，在确保上面所需要的环境都配置妥当之后，只需一个命令即可创建好工程的骨架。

 > 使用mvn命令进行生成

  + Linux环境(bash)
    
        ```bash
        mvn archetype:generate -B \
        -DarchetypeGroupId=com.liuzhousteel.swallow \
        -DarchetypeArtifactId=swallow-archetype \
        -DarchetypeVersion=LATEST \
        -DgroupId=com.liuzhousteel \
        -DartifactId=demo \
        -Dversion=1.0-SNAPSHOT
        ```
  + Windows环境(bat)
     
        ```bat
         mvn archetype:generate -B ^
          -DarchetypeGroupId=com.liuzhousteel.swallow ^
          -DarchetypeArtifactId=swallow-archetype ^
          -DarchetypeVersion=LATEST ^
          -DgroupId=com.liuzhousteel ^
          -DartifactId=demo ^
          -Dversion=1.0-SNAPSHOT
        ```
上面命令中，我们并不需要关心那么多，只需要关心哪些呢？首先需要关心的是我们要生成的工程的pom坐标，也就是`groupId`,`artifactId`,`version`等几个要素。分别对应的就是命令中的
``` 
 -DgroupId=com.liuzhousteel // 项目的groupId
 -DartifactId=demo          // 项目的artifactId
 -Dversion=1.0-SNAPSHOT     // 项目的version
```
在您的操作系统的终端执行对应的命令之后，如果不出意外，会得到如下目录结构的工程,相信使用过SpringBoot的朋友会很熟悉这样的工程目录结构，我们只是在标准的SpringBoot工程基础之上，添加多了一点东西而已。
```text
C:\WORKSPACE\ARCHETYPE\DEMO
│  pom.xml
├─assembly
│      assembly.xml
├─bin
│      start.cmd
│      start.sh
│      stop.cmd
│      stop.sh
└─src
    ├─main
    │  ├─java
    │  │  └─com
    │  │      └─liuzhousteel
    │  │          │  Application.java
    │  │          ├─controller
    │  │          ├─dao
    │  │          ├─entity
    │  │          └─service
    │  └─resources
    │          application-dev.yml
    │          application-prod.yml
    │          application.yml
    └─test
        ├─java
        │  └─com
        │      └─liuzhousteel
        │              ApplicationTest.java
        └─resources
```


由于生成的工程是一个标准的maven工程，因此，只需要导入到您的IDE工具中即可。

## 代码生成

我们都知道，Java语言有个相比动态语言来说不好的地方就是啰嗦，比如说一个实体类，需要定义跟数据库字段一一对应的属性，同时提供getter/setter，也就是传说中的javabean，在一些时候，如果我们的数据表的字段很多的时候，光是写这些代码都会浪费很多时间，为了能够更好将时间使用在业务逻辑上，把这些重复性的工作交给框架去做即可。于是乎，我们提供了代码生成的工具，可以根据数据表生成对应的Dao,Entity或者表字段的定义类等代码，可以省去这部分的时间。对于生成的Entity类，我们使用了Lombok。下面让我们来看看怎么在工程中使用代码生成的功能。

根据上面mvn自动生成的工程骨架，我们先在classpath下(一般就是直接在resources下)放置一个配置文件`generator.properties`，如下
```conf
# 下面这几个是jdbc的配置，没啥好说的了
jdbc.url=
jdbc.username=
jdbc.password=
jdbc.driver=

# 要生成Def类所在的包，一般这个是不需要的
gen.defPackage=com.liuzhousteel.entity.def

# 要生成的Entity类所在的包
gen.entityPackage=com.liuzhousteel.entity

# 要生成的Dao类所在的包
gen.daoPackage=com.liuzhousteel.dao

# 使用的数据库类型，默认mysql，如果使用oracle或者别的要换掉这个
gen.dbStyle=org.beetl.sql.core.db.MySqlStyle

# 名称转换器，这个要不要改
gen.nameConversion=org.beetl.sql.core.DefaultNameConversion
```

在工程的代码中随意创建一个java类，暂且叫_GenCode.java，在类中调用我们提供的genXXX系列方法进行代码生成即可。我们建议生成前可以先调用genXXXToConsole系列方法打印到控制台看下效果，下面给出一些演示代码，具体功能可以自己尝试。
```java
public static void main(String[] args) {
  CodeGenerator generator = CodeGenerator.create();
  // 生成指定数据库连接的所有表
  generator.genDefToConsole();
  generator.genEntityToConsole();
  generator.genDaoToConsole();
  // 生成指定表的代码到控制台
  generator.genEntityToConsole("tableName");
}
```
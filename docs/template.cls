\LoadClass[a4paper,11pt]{article} % Classe du document

%--------------------- Packages ------------------------

\RequirePackage[french]{babel} %Langue du document
\RequirePackage[utf8]{inputenc} %Caractères spéciaux
\RequirePackage[section]{placeins}%Pour placement de section
\RequirePackage[T1]{fontenc} %Quelques lettres qui sont pas inclus dans UTF-8
\RequirePackage{mathtools} %Paquet pour des équations et symboles mathématiques
\RequirePackage{siunitx} %Pour écrire avec la notation scientifique (Ex.: \num{2e+9})
\RequirePackage{float} %Pour placement d'images
\RequirePackage{graphicx} %Paquet pour insérer des images
\RequirePackage[justification=centering]{caption} %Pour les légendes centralisées
\RequirePackage{subcaption}
\RequirePackage{wallpaper}
\RequirePackage{nomencl}
\makenomenclature
\RequirePackage{fancyhdr}
\pagestyle{fancy}
\fancyheadoffset{1cm}
\setlength{\headheight}{2cm}
\RequirePackage{url}
\RequirePackage[hidelinks]{hyperref}%Paquet pour insérer légendes dans des sous-figures comme Figure 1a, 1b
\RequirePackage[top=3cm, bottom=3cm, left=2.5cm, right=2.5cm]{geometry} %Configuration de la page

%---------------------- Pour faire des tableaux ------------------------
\usepackage{array,multirow,makecell}
\setcellgapes{1pt}
\makegapedcells
\usepackage{colortbl}
\newcolumntype{R}[1]{>{\raggedleft\arraybackslash }b{#1}}
\newcolumntype{L}[1]{>{\raggedright\arraybackslash }b{#1}}
\newcolumntype{C}[1]{>{\centering\arraybackslash }b{#1}}

%------------------------ Pour écrire du code --------------------------
\usepackage{xcolor} %Pour faire du texte en couleur
\usepackage{listings}

%------------ Packages pour faire des dessins(géogébra) ----------------
\usepackage{pgfplots}
\pgfplotsset{compat=1.15}
\usepackage{mathrsfs}
\usetikzlibrary{arrows}

\usepackage{hyperref}%pour faire des liens/hyperliens
%-----------------------------------------------------------------------

%-------------------- Informations sur le rapport ----------------------

\newcommand{\UE}[1]{\renewcommand{\UE}{#1}}
\newcommand{\sujet}[1]{\renewcommand{\sujet}{#1}}
\newcommand{\titre}[1]{\renewcommand{\titre}{#1}}
\newcommand{\enseignant}[1]{\renewcommand{\enseignant}{#1}}
\newcommand{\eleves}[1]{\renewcommand{\eleves}{#1}}

\newcommand{\fairemarges}{
    \makenomenclature
    \pagestyle{fancy}
    \fancyheadoffset{1cm}
    \setlength{\headheight}{2cm}
    \lhead{\includegraphics[scale=0.3]{logos/n7_bandeau.png}} %Affichage de l'image au top de la page
    \rhead{\nouppercase{\leftmark}}
    \rfoot{\thepage}
    \cfoot{\textbf{\titre}}
    % \lfoot{\UE}
}

\newcommand{\fairepagedegarde}{
    \begin{titlepage}

        \ThisLRCornerWallPaper{0.6}{logos/Steinn7.jpg}
        \centering %Centraliser le contenu
        \includegraphics[width=0.5\textwidth]{logos/n7_logos.png}\par\vspace{1cm} %Insertion du logo
        {\scshape\LARGE ENSEEIHT \par} %Nom de l'université
        \vspace{1.5cm}%Espace de 1,5cm
        {\scshape\Large \UE \\ \sujet \\ Rapport\par} %sous-titre
        \vspace{1cm}%Espace de 1cm
        \rule{\linewidth}{0.2 mm} \\[0.4 cm]
        {\huge\bfseries \titre \par} \
        \rule{\linewidth}{0.2 mm} \\[1.5 cm]
        \vspace{1cm}%Espace de 3cm

        \begin{minipage}{0.5\textwidth} %Minipage pour faire deux colonnes
            \begin{flushleft} \large %Envoyer à gauche
                \emph{\textbf{Élèves :}}\\ %Pour le titre au dessus des noms à gauche
                \eleves\\ %Remplacer pour chacun
            \end{flushleft}
        \end{minipage}
        ~
        \begin{minipage}{0.4\textwidth}
            \begin{flushright} \large
                \emph{\textbf{Enseignant :}} \\
                \enseignant \\
            \end{flushright}
        \end{minipage}\\[4cm]

        \vfill
        {\large \today\par} %Affichage de la date

    \end{titlepage}
}

\newcommand{\tabledematieres}{
    \tableofcontents
}
\newcommand{\listedesfigures}{
    \listoffigures
}

\newcommand{\insererfigure}[4]{
    \begin{figure}[ht]
        \centering
        \includegraphics[height=#2]{#1}
        \caption{#3}
        \label{fig: #4}
    \end{figure}
}

-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 19 Lut 2020, 20:42
-- Wersja serwera: 10.1.38-MariaDB
-- Wersja PHP: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `mydb`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `autorzy`
--

CREATE TABLE `autorzy` (
  `IdAuthor` int(11) NOT NULL,
  `Name` varchar(30) NOT NULL,
  `LName` varchar(30) NOT NULL,
  `ADescr` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `autorzy`
--

INSERT INTO `autorzy` (`IdAuthor`, `Name`, `LName`, `ADescr`) VALUES
(1, 'John R.R.', 'Tolkien', 'Brytyjski pisarz. Popularyzator literatury fantasy.'),
(2, 'Stephen', 'King', 'Amerykański pisarz literatury grozy.'),
(3, 'Chris', 'Pramas', 'Amerykański game designer i pisarz. Założyciel Green Ronin Publishing.'),
(4, 'Howard Phillips', 'Lovecraft', 'amerykański pisarz, autor opowieści grozy i fantasy, twórca mitologii Cthulhu.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `biblioteka uzytkownika`
--

CREATE TABLE `biblioteka uzytkownika` (
  `IdUser` int(11) NOT NULL,
  `IdBook` int(11) NOT NULL,
  `ReadCheck` int(11) DEFAULT '0',
  `WishCheck` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `biblioteka uzytkownika`
--

INSERT INTO `biblioteka uzytkownika` (`IdUser`, `IdBook`, `ReadCheck`, `WishCheck`) VALUES
(16, 3, 0, 0),
(16, 7, 0, 0),
(16, 5, 0, 0),
(16, 4, 0, 0),
(16, 8, 0, 0),
(16, 8, 0, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `kategorie`
--

CREATE TABLE `kategorie` (
  `IdCat` int(11) NOT NULL,
  `CTitle` varchar(30) NOT NULL,
  `CDescr` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `kategorie`
--

INSERT INTO `kategorie` (`IdCat`, `CTitle`, `CDescr`) VALUES
(1, 'Fantasy', 'Gatunek literacji używający magii lub form nadprzyodzonych jako ważnego motywu fabuły.'),
(2, 'Horror', 'Gatunek literatury z pogranicza fantasy której celem jest wywołanie klimatu grozy.');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `komentarze`
--

CREATE TABLE `komentarze` (
  `IdComment` int(11) NOT NULL,
  `IdUser` int(11) NOT NULL,
  `IdBook` int(11) NOT NULL,
  `Content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `komentarze`
--

INSERT INTO `komentarze` (`IdComment`, `IdUser`, `IdBook`, `Content`) VALUES
(1, 16, 3, 'KOMENTARZ TESTOWY 1'),
(2, 16, 3, 'KOMENTARZ TESTOWY 2'),
(5, 16, 3, 'qwertyuiohgfdss'),
(6, 16, 3, 'ddddddddddddddddddddddddddddddddddddddddd'),
(7, 16, 3, 'qwertyuiop[jhgdfd'),
(8, 16, 7, '123456'),
(9, 16, 4, '1234567'),
(10, 16, 6, 'wwwwww'),
(11, 16, 3, 'ddddddddddd'),
(12, 16, 4, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla tempus tortor in dignissim vulputate. Ut sagittis nibh nulla, vitae sollicitudin sem pellentesque a. Praesent id elit massa. Curabitur quis dictum lorem. Curabitur nunc dolor, ultricies metus.'),
(17, 22, 5, 'Komentarz testowy');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `ksiazki`
--

CREATE TABLE `ksiazki` (
  `IdBook` int(11) NOT NULL,
  `BTitle` varchar(100) NOT NULL,
  `IdAuthor` int(11) NOT NULL,
  `BPublish` varchar(30) NOT NULL,
  `IdCat` int(11) NOT NULL,
  `pdfName` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `ksiazki`
--

INSERT INTO `ksiazki` (`IdBook`, `BTitle`, `IdAuthor`, `BPublish`, `IdCat`, `pdfName`) VALUES
(3, 'Warhammer: Fantasy Roleplay', 3, 'BL Publishing', 1, 'https://docs.google.com/document/d/e/2PACX-1vQm4E6UACRFK1cVOCnCgg5-Am9T0KO8ed75MnddfjlMVoRqik3OcsjbsxiUtoDuc5Uo9PaPa5Qrx4Sm/pub?embedded=true'),
(4, 'Władca Pierścieni: Drużyna Pierścienia', 1, 'Allen & Unwin', 1, 'https://docs.google.com/document/d/e/2PACX-1vSVH5dHSmF634HR9lU-t7uMXQus7ei4vdZVXB7q5viohHZAi28EqY-ONwLakgl1Fn-XPzyaE_dbJxDC/pub?embedded=true'),
(5, 'Władca Pierścieni: Dwie Wierze', 1, 'Allen & Unwin', 1, 'https://docs.google.com/document/d/e/2PACX-1vSy07C0c6LQoLO_Xwl3cTOQm68bSfjxd2VdYzVGzcZYZzno-2QlYgG91SxW6dKPQTC-yfFBlL-mDmQq/pub?embedded=true'),
(6, 'Władca Pierścieni: Powrót Króla', 1, 'Allen & Unwin', 1, 'https://docs.google.com/document/d/e/2PACX-1vREjv2TvYJV7F-hSy2dw2uIEAMdcNbBfHhLmG5x60tlWqTIr-U6NBdhg4lStYqR93SAv1rJENDsgyOP/pub?embedded=true'),
(7, 'To', 2, 'Viking Press', 2, 'https://docs.google.com/document/d/e/2PACX-1vR5GsOIZn612Ul_0yq_DS1cg1tMhvBPdOkra2pZAnOGwlfCviMdeOKRhYSv15P3Ukf1dw42bZQ6GiKw/pub?embedded=true'),
(8, 'Kolor z Przestworzy', 4, 'Amazing Stories', 2, 'https://docs.google.com/document/d/e/2PACX-1vQm4E6UACRFK1cVOCnCgg5-Am9T0KO8ed75MnddfjlMVoRqik3OcsjbsxiUtoDuc5Uo9PaPa5Qrx4Sm/pub?embedded=true');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `recenzje`
--

CREATE TABLE `recenzje` (
  `IdReview` int(11) NOT NULL,
  `IdUser` int(11) NOT NULL,
  `IdBook` int(11) NOT NULL,
  `RContent` varchar(2000) NOT NULL,
  `RRate` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `recenzje`
--

INSERT INTO `recenzje` (`IdReview`, `IdUser`, `IdBook`, `RContent`, `RRate`) VALUES
(1, 1, 3, 'Recenzja testowa', 10),
(2, 2, 3, 'Recenzja testowa 2', 1),
(3, 16, 3, 'sssssssssssssssssssssssssssssssssssss', NULL),
(4, 16, 3, 'sssssssssssssssssssssssssssssssssssss', NULL),
(5, 16, 7, '123456', NULL),
(6, 16, 4, '1234456', NULL),
(7, 16, 4, 'Władca Pierścieni” to najsłynniejsza powieść fantasy wszech czasów. Co ja piszę? To w ogóle najsłynniejsza powieść niezależnie od odmiany gatunkowej. W końcu wszędzie już trąbią, że żadna inna nie sprzedała się tak jak ta. Absolutny bestseller. Opowiada ona o mitycznej krainie: Śródziemiu, położonej gdzieś między Valinorem – siedzibą Valarów i elfów, i światem podziemnym rządzonym przez bezimienne ciemne istoty. Opowiada o małym hobbicie – Frodzie Bagginsie, jego przyjaciołach: Samie, Merrym i Pippinie, którzy wyruszyli w wielki świat, żeby wrzucić Jedyny Pierścień – serce i źródło mocy zła władcy ciemności Saurona, do Szczelin Zagłady na stokach Orodruiny w krainie Mordoru. Opowiada o ich przyjaciołach – Gandalfie, Aragornie, Legolasie, Gimlim, Boromirze, którzy zgodzili się towarzyszyć im do Mordoru, ale których przewrotny los rozdzielił. Opowiada o ostatnich dniach Trzeciej Ery, o zdradzie najpotężniejszego z czarodziejów – Sarumana, o przejściu Aragorna Ścieżką Umarłych, o wielkiej wojnie Gondoru z siłami ciemności, o…\n\nAle to nie jest najważniejsze!\n\n„Władca Pierścieni” był śmiałą próbą stworzenia brytyjskiego eposu na miarę „Iliady” czy „Kalewali”. Próbą dokonaną piórem nikomu nieznanego profesora – znawcy języka staroangielskiego, o której można powiedzieć, że odwrotnie niż u Horacego: śmieszna mysz zrodziła górę. Bo powieść stała się wzorcem dla wielu epigonów, niekoniecznie nawet piszących w konwencji fantasy. Była impulsem, dzięki któremu całe rzesze ludzi zaczęły poszukiwać swojej tożsamości w mitach i legendach, w tradycji druidycznej ludów Północy Europy. A często również i korzeni.\n\nAle to też nie jest najważniejsze!\n\n\"Władca Pierścieni\" stał się ostatnio bohaterem największego medialnego i finansowego sukcesu popkultury. Stał się kolorową, jaskrawą ikoną, którą bez trudu wszyscy rozpoznają, zachwycają się, identyfikują czy nawet modlą, ale którą niewielu rozumie. Może dlatego, że rozumieć nie chce. Ikoną napędzającą koniunkturę, obrót, bo przecież ist', NULL),
(16, 16, 3, 'recenzja z oceną', NULL),
(17, 16, 3, 'racemzja z oceną v2', NULL),
(18, 16, 3, 'dsadsa', 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `uzytkownicy`
--

CREATE TABLE `uzytkownicy` (
  `IdUser` int(11) NOT NULL,
  `Name` varchar(20) NOT NULL,
  `LName` varchar(30) NOT NULL,
  `passwd` varchar(255) NOT NULL,
  `Email` varchar(30) NOT NULL,
  `Time` datetime NOT NULL,
  `IP` varchar(38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `uzytkownicy`
--

INSERT INTO `uzytkownicy` (`IdUser`, `Name`, `LName`, `passwd`, `Email`, `Time`, `IP`) VALUES
(1, 'Admin', 'Admin', '', 'admin@mod.com', '2019-05-01 00:00:00', '192.168.0.1'),
(2, 'User1', 'Uzyt1', '', 'user@uzyt.com', '2019-05-01 00:00:00', '192.168.0.1'),
(3, 'Ja', 'TEST', 'testpass', 'TEST@test', '0000-00-00 00:00:00', '21.09.92.33'),
(4, 'TEST_IP', 'TEST_IP', 'ippass', 'IP@IP.pl', '0000-00-00 00:00:00', '12.21.42.23'),
(5, 'TEST_IP2', 'TEST_IP2', 'iptest', 'IP2@IP.pl', '0000-00-00 00:00:00', '12.21.42.23'),
(12, 'TEST_crypt', 'TEST_crypt', '$2a$10$O7TUWNVCCcntwYDea206zeSF2e2oPT.i1My2gE4jFu2sWpMmSeDdG', 'crypt@crypt.pl', '2012-12-12 00:00:00', '::1'),
(13, 'TEST1_date', 'TEST1_date', '$2a$10$j/czdF/K3q4T5Hsoj8Sn9uxlo1V9LWLDT9UYJEEBcykRTI2rN1AsK', 'date@date.pl', '0000-00-00 00:00:00', '::1'),
(14, 'TEST2_date', 'TEST2_date', '$2a$10$REScxlsJNu4QsCU53fZ0JuG1v.xWyOXR/duS67Zus0.QSc/SMUVpa', 'date2@date.pl', '2020-01-16 00:00:00', '::1'),
(15, 'TEST3_date', 'TEST3_date', '$2a$10$iBhH310M9eAj8Tc9xlR61.6SnKRuoFjOA9GqKR7DS73pnvuIhFEZW', 'date3@date.pl', '2020-01-16 21:37:35', '::1'),
(16, 'admin', 'admin', '$2a$10$wSkSXNseLdA1aZjGJOfcvuyHV/y2W/rCH4mXDqgTwlgGpipgV2pLK', 'admin@admin.pl', '2020-01-22 17:33:28', '::1'),
(17, 'Damian', 'Ułaś', '$2a$10$LHUiulkRDjxYw7T3tQKcpuN7.5XQ15vXOIFgkFF2CrYxttz3rQQ6u', 'dam1138@gmail.com', '2020-02-15 16:28:06', '::1'),
(18, 'Damian', 'Ułaś', '$2a$10$eCbkWqXt6FrEb3mBVsu8Ae0uwjMBibs2DPT/Akedp0H6fdzzPCTEO', 'dam11381@gmail.com', '2020-02-15 16:32:57', '::1'),
(19, 'Amadeusz', 'Pompka', '$2a$10$76C/nD8s05QOvsafhK.bL.SVM2kKn3oiJbBgodhNE/ZyHGU85Dl/.', '123@123.pl', '2020-02-15 17:02:21', '::1'),
(20, 'Damian', 'Ułaś', '$2a$10$nP6uriaLwjVslVSefJmeseGKfaNZJVqfCWotb9mdiGgNYcWixzPkm', 'niemawbazie@gmail.com', '2020-02-15 17:41:04', '::1'),
(21, 'Damian Ułaś', 'Ułaś', '$2a$10$cTApxdSEaoZK1CCqJ3raduIzUkMI1zGYUo0NNvR4IbnUZEDMCVYk6', 'poprawnedane@gmail.com', '2020-02-15 17:42:32', '::1'),
(22, 'Jan', 'Kowalski', '$2a$10$H/PuC/04usGdQ1en/RQySuxheJLsWLUvnrUk2CJyan/Y7DOMzZvIa', 'nowedane@poprawne.pl', '2020-02-15 17:43:36', '::1');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `autorzy`
--
ALTER TABLE `autorzy`
  ADD PRIMARY KEY (`IdAuthor`),
  ADD UNIQUE KEY `IdAuthor_UNIQUE` (`IdAuthor`);

--
-- Indeksy dla tabeli `biblioteka uzytkownika`
--
ALTER TABLE `biblioteka uzytkownika`
  ADD KEY `fk_Biblioteka uzytkownika_Ksiazki2_idx` (`IdBook`),
  ADD KEY `fk_Biblioteka uzytkownika_Uzytkownicy1_idx` (`IdUser`);

--
-- Indeksy dla tabeli `kategorie`
--
ALTER TABLE `kategorie`
  ADD PRIMARY KEY (`IdCat`),
  ADD UNIQUE KEY `IdCat_UNIQUE` (`IdCat`);

--
-- Indeksy dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  ADD PRIMARY KEY (`IdComment`),
  ADD UNIQUE KEY `IdComment_UNIQUE` (`IdComment`),
  ADD KEY `fk_Komentarze_Uzytkownicy2_idx` (`IdUser`),
  ADD KEY `fk_Komentarze_Ksiazki1_idx` (`IdBook`);

--
-- Indeksy dla tabeli `ksiazki`
--
ALTER TABLE `ksiazki`
  ADD PRIMARY KEY (`IdBook`),
  ADD UNIQUE KEY `IdBook_UNIQUE` (`IdBook`),
  ADD KEY `fk_Ksiazki_Autor1_idx` (`IdAuthor`),
  ADD KEY `fk_Ksiazki_Kategorie1_idx` (`IdCat`);

--
-- Indeksy dla tabeli `recenzje`
--
ALTER TABLE `recenzje`
  ADD PRIMARY KEY (`IdReview`),
  ADD UNIQUE KEY `IdReview_UNIQUE` (`IdReview`),
  ADD KEY `fk_Recenzje_Uzytkownicy1_idx` (`IdUser`);

--
-- Indeksy dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  ADD PRIMARY KEY (`IdUser`),
  ADD UNIQUE KEY `idUser_UNIQUE` (`IdUser`),
  ADD UNIQUE KEY `E-mail_UNIQUE` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `autorzy`
--
ALTER TABLE `autorzy`
  MODIFY `IdAuthor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT dla tabeli `kategorie`
--
ALTER TABLE `kategorie`
  MODIFY `IdCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  MODIFY `IdComment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT dla tabeli `ksiazki`
--
ALTER TABLE `ksiazki`
  MODIFY `IdBook` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `recenzje`
--
ALTER TABLE `recenzje`
  MODIFY `IdReview` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT dla tabeli `uzytkownicy`
--
ALTER TABLE `uzytkownicy`
  MODIFY `IdUser` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `biblioteka uzytkownika`
--
ALTER TABLE `biblioteka uzytkownika`
  ADD CONSTRAINT `fk_Biblioteka uzytkownika_Ksiazki2` FOREIGN KEY (`IdBook`) REFERENCES `ksiazki` (`IdBook`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Biblioteka uzytkownika_Uzytkownicy1` FOREIGN KEY (`IdUser`) REFERENCES `uzytkownicy` (`IdUser`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `komentarze`
--
ALTER TABLE `komentarze`
  ADD CONSTRAINT `fk_Komentarze_Ksiazki1` FOREIGN KEY (`IdBook`) REFERENCES `ksiazki` (`IdBook`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Komentarze_Uzytkownicy2` FOREIGN KEY (`IdUser`) REFERENCES `uzytkownicy` (`IdUser`) ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `ksiazki`
--
ALTER TABLE `ksiazki`
  ADD CONSTRAINT `fk_Ksiazki_Autor1` FOREIGN KEY (`IdAuthor`) REFERENCES `autorzy` (`IdAuthor`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_Ksiazki_Kategorie1` FOREIGN KEY (`IdCat`) REFERENCES `kategorie` (`IdCat`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ograniczenia dla tabeli `recenzje`
--
ALTER TABLE `recenzje`
  ADD CONSTRAINT `fk_Recenzje_Uzytkownicy1` FOREIGN KEY (`IdUser`) REFERENCES `uzytkownicy` (`IdUser`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

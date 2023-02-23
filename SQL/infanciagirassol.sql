-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23-Fev-2023 às 18:55
-- Versão do servidor: 10.4.27-MariaDB
-- versão do PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `infanciagirassol`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `actionfigure`
--

CREATE TABLE `actionfigure` (
  `id` int(40) NOT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `nome` varchar(200) DEFAULT NULL,
  `preco` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `actionfigure`
--

INSERT INTO `actionfigure` (`id`, `tipo`, `nome`, `preco`) VALUES
(1, 'Action Figure', 'Sakura', 'R$ 150'),
(5, 'pdksaodp', 'dsadpk', 'odkpsakdsa');

-- --------------------------------------------------------

--
-- Estrutura da tabela `brinquedos`
--

CREATE TABLE `brinquedos` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `material` varchar(20) DEFAULT NULL,
  `preco` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `CNPJ` varchar(100) NOT NULL,
  `nome` varchar(300) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `local` varchar(1000) DEFAULT NULL,
  `telefone` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `funcionario`
--

CREATE TABLE `funcionario` (
  `CPF` varchar(80) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `cargo` varchar(50) DEFAULT NULL,
  `idade` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `giftcard`
--

CREATE TABLE `giftcard` (
  `id` int(11) NOT NULL,
  `tipo` varchar(100) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `preco` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `giftcard`
--

INSERT INTO `giftcard` (`id`, `tipo`, `nome`, `preco`) VALUES
(1, 'dopaksdpaskod', 'doksapdoask', 'doaskdpaskdoaspd'),
(2, 'ofodfipasifo', 'kjsgpdagop', 'pfoiafopai');

-- --------------------------------------------------------

--
-- Estrutura da tabela `jogodemesa`
--

CREATE TABLE `jogodemesa` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) DEFAULT NULL,
  `genero` varchar(50) DEFAULT NULL,
  `descricao` varchar(20) DEFAULT NULL,
  `preco` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `actionfigure`
--
ALTER TABLE `actionfigure`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `brinquedos`
--
ALTER TABLE `brinquedos`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`CNPJ`);

--
-- Índices para tabela `funcionario`
--
ALTER TABLE `funcionario`
  ADD PRIMARY KEY (`CPF`);

--
-- Índices para tabela `giftcard`
--
ALTER TABLE `giftcard`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `jogodemesa`
--
ALTER TABLE `jogodemesa`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `actionfigure`
--
ALTER TABLE `actionfigure`
  MODIFY `id` int(40) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `brinquedos`
--
ALTER TABLE `brinquedos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `giftcard`
--
ALTER TABLE `giftcard`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `jogodemesa`
--
ALTER TABLE `jogodemesa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

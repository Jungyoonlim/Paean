import { Card as AntdCard, Radio } from "antd";
import EmptyImg from "assets/image/empty.svg"; // put in the svg image for cards
import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import Swal from "sweetalert2";
import http from "../../utils/api";
import "./styles.scss";

interface Deck {
    id: string;
    title: string; 
    description: string;
    visibility: string;
}

interface Card {
    front: string;
    back: string;
    hint: string; 
}

const CreateCards = () => {
    const navigate = useNavigate();
    const emptyCard = {
        front: "",
        back: "",
        hint: "",
    };
    const [deck, setDeck] = useState<Deck | null>(null);
    const [cards, setCards] = useState([emptyCard]);
    const [originalCards, setOriginalCards] = useState([]);
    const [fetchingDeck, setFetchingDeck] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // more on Sep 25-
}
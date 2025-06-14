import responseToSignotation from './translator/LSETranslator.js'

const VISSE_BACKEND_URL = "https://holstein.fdi.ucm.es/visse/backend/recognize?raw=true";
const SIGNARIO_URL = "https://griffos.filol.ucm.es/signario/buscar?";

export const connection = async (dispatch, image) => {
    try {
        dispatch({ type: "set_loading" });
        const response = await fetch(
            VISSE_BACKEND_URL,
            {
                method: "POST",
                body: image,
            }
        );
        const responseData = await response.json();
        const [signotationElems, signotation] = await responseToSignotation(responseData);
        dispatch({ type: "set_signotation", signotation: signotationElems });
        const url = new URL(
            SIGNARIO_URL +
                new URLSearchParams({
                    s: signotation,
                    // l es opcional
                })
        );

        const videosResponse = await fetch(url, {
            method: "GET",
        });
        const videosData = await videosResponse.json();
        dispatch({ type: "signario_response", videos: videosData["signs"] });
    } catch (error) {
        const message = (error.message.includes("Se ha identificado más de una mano en la imagen.") || error.message.includes("No se ha podido traducir la imagen."))
            ? error.message
            : "No se ha podido reconocer la imagen.";

        dispatch({ type: "error_response", error: message });
    } finally {
        dispatch({ type: "set_loaded" });
    }
};


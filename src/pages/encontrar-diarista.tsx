import React, { useEffect, useState } from "react";
import { ScrollView } from 'react-native';
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import TextInput from "ui/components/inputs/TextInput/TextInput";
import { TextInputMask } from "react-native-masked-text";
import Button from "ui/components/inputs/Button/Button";
import UserInformation from "ui/components/data-display/UserInformnation/UserInformation";
import { FormContainer, ErroText, ResponseContainer, TextContainer } from "@styles/pages/encontrar-diaristas.style";
import { useTheme } from "@emotion/react";
import useIndex from "data/hooks/pages/useIndex.page";
import useEncontrarDiaristas from "data/hooks/pages/useEncontrarDiaristas.page.mobile";

const EncontrarDiaristas: React.FC = () => {
    const { colors } = useTheme();
    const {
        cep,
        setCep,
        cepValido,
        buscarProfissionais,
        erro,
        diaristas,
        buscaFeita,
        carregando,
        diaristasRestante,
    } = useIndex(),
    {cepAutomatico} = useEncontrarDiaristas();

    useEffect(() => {
        if (cepAutomatico && !cep) {
            setCep(cepAutomatico);
            buscarProfissionais(cepAutomatico);
        }
    }, [cepAutomatico])

    return(
        <ScrollView>
            <PageTitle 
                title={'Conheça os profissionais'}
                subtitle={'Preencha seu endereço e veja todos os profissionais da sua localidade'}
            />
            <FormContainer>
                <TextInputMask 
                    value={cep}
                    onChangeText={setCep}
                    type={'custom'}
                    options={{
                        mask: '99.999-999'
                    }}
                    customTextInput={TextInput}
                    customTextInputProps={{
                        label: 'Digite seu CEP'
                    }}
                />

                {erro ? <ErroText>{erro}</ErroText> : null}

                <Button 
                    mode={'contained'} 
                    style={{marginTop: 32}}
                    color={colors.accent}
                    disabled={!cepValido || carregando}
                    onPress={() => buscarProfissionais(cep)}
                    loading={carregando}
                >
                    Buscar
                </Button>
            </FormContainer>
            {buscaFeita && ( diaristas.length > 0 ? (
                <ResponseContainer>

                    {diaristas.map((item, index) => (
                        <UserInformation  
                            key={index}
                            name={item.nome_completo}
                            rating={item.reputacao || 0}
                            picture={item.foto_usuario || ''}
                            description={item.cidade}
                            darker={index % 2 === 1}
                        /> 
                    ))}

                    

                    {diaristasRestante > 0 && (
                        <TextContainer>
                            ... e mais {diaristasRestante}{' '}
                            {diaristasRestante > 1
                                ? 'profissionais atendem'
                                : 'profissional atende'}{' '} 
                            ao seu endereço.
                        </TextContainer>
                    )}
                    <Button 
                        mode={'contained'} 
                        color={colors.accent}
                    >
                        Contratar um profissional
                    </Button>
                </ResponseContainer>

            ) : (
                <TextContainer>
                    Desculpe não temos nenhuma diarista dsponivel na sua região.
                </TextContainer>
            ))}
            

        </ScrollView>
    )
}

export default EncontrarDiaristas;
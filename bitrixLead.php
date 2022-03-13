<?php
    $phone = "";
    // удаляем все символы, кроме цифр
    if (isset ( $_POST['phone'] ))
        $phone = preg_replace('/\D/', '', $_POST['phone']);

    $name = $_POST['name'];
    $comment = $_POST['comment'];
    //
    $result = createBitrixLead($name, $phone, $comment);

    header('Content-type: application/json');
    echo json_encode($result);
    
   

    /**
     * Запрос в api.cek.ru
     */
    function createBitrixLead($name, $phone, $comment)
    {
         // формируем URL в переменной $queryUrl для обращения через вебхук
        $queryUrl = 'https://bitrix.cek.ru/rest/89/ffrdac5rlarvvqc7/crm.lead.add.json';
        // формируем параметры для создания лида в переменной $queryData
        $bitrix_arg = array(
            //новый
            "STATUS_ID" => "NEW",
            //доступен всем
            "OPENED" => "Y",
            //Наименование лида
            'TITLE' => 'Заявка ibp.cek.ru',
            //идентификатор ответственного лица (Никонова Юлия id=92)
            'ASSIGNED_BY_ID' => '5220',
            //имя клиента из формы
            'NAME' => $name,
            //мобильный телефон клиента из формы
            'PHONE' => array(array('VALUE' => $phone, 'VALUE_TYPE' => 'MOBILE')),
            //комментарий клиента из формы
            'COMMENTS' => $comment,
        );
        // добавляем массив utm-параметров (если они есть)
        $bitrix_arg = array_merge($bitrix_arg, $_POST['UTM_CEK_ADV']);
        //
        $queryData = http_build_query(array(
            'fields' => $bitrix_arg,
            'params' => array("REGISTER_SONET_EVENT" => "Y")
        ));

        // обращаемся к Битрикс24 при помощи функции curl_exec
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_SSL_VERIFYPEER => 0,
            CURLOPT_POST => 1,
            CURLOPT_HEADER => 0,
            CURLOPT_RETURNTRANSFER => 1,
            CURLOPT_URL => $queryUrl,
            CURLOPT_POSTFIELDS => $queryData,
        ));

        if($data = curl_exec($curl)){
            $http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            
            if($http_code >= 200 && $http_code < 300){
                $result['success'] = true;
                $result['data'] = $data;
                $result['http_code'] = $http_code;
    
            }else{
                $result['success'] = false;
                $result['http_code'] = $http_code;
                $result['url'] = $url;
            }
            
        }else{
            $result['success'] = false;
            $result['curl_error_code'] = curl_errno($curl);
        };
        
        curl_close($curl);
        return $result;       
    }

?>
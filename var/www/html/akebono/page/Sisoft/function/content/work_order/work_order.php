<?php
function worder()
{
	/**----- Delete -------------------*/
	if (isset($_REQUEST['delete'])) {
		$query = 'UPDATE work_order SET Hidden="yes" WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		mysql_exe_query(array($query, 1));
	}

	/*------Get Pop Up Windows---------*/
	$content = pop_up(array('worder', PATH_WORDER));

	$content .= '<br/><div class="ade">WORK ORDER</div>';
	$content .= '<div class="toptext" align="center">' . _USER_VIEW_ . _USER_INSERT_ . '</div>';
	$content .= '<br/><div id="example1" style="width: 1030px; height: 500px; overflow: hidden; font-size=10px;"></div>';
	//-------set lebar kolom -------------
	//==========Old================
	//if(_DELETE_) $width = "[200,200,300,150,150,80,80,200,200,200,200,200,200,200,200,200,200,400,400,400,400]";
	//else $width = "[200,300,300,150,150,80,200,200,200,200,200,200,200,200,200,400,400,400,400]";

	if (_DELETE_) $width = "[150,200,500,400,250,150,200,200,200,200,200,200,200,80,80]";
	else $width = "[150,200,500,400,250,150,200,200,200,200,200,200,200,80,80]";
	if ($_SESSION['userID'] != '') {
		//-------get id pada sql -------------
		if (isset($_REQUEST['dashwoclose'])) {
			$wobaru = WORDER . ' AND WO.WorkTypeID<>"WT000002" AND (WO.WorkStatusID="WS000020") ORDER BY WO.WorkOrderNo DESC';
		} else if (isset($_REQUEST['dashwoact'])) {
			$wobaru = WORDER . ' AND WO.WorkTypeID<>"WT000002" AND WO.WorkStatusID NOT IN (SELECT WorkStatusID FROM work_status WHERE WorkStatusID="WS000020" OR WorkStatusID="WS000021") ORDER BY WO.WorkOrderNo DESC';
		} else {

			//mengambil Asset ID berdasarkan RequestorID di tabel WO where Session User ID
			$query_status = 'SELECT WO.AssetID FROM work_order WO, asset A WHERE WO.AssetID=A.AssetID AND (A.EmployeeID="' . $_SESSION['userID'] . '" OR WO.RequestorID="' . $_SESSION['userID'] . '") ';
			//echo $query_status;
			$result_status = mysql_exe_query(array($query_status, 1));

			while ($r_now_status = mysql_exe_fetch_array(array($result_status, 1))) {
				//echo json_encode($r_now_status);
				$assetID = $r_now_status[0];
				//mengambil employeeID di tabel ASSET berdasarkan ASSET yang didapat dari query diatas
				$query_asset = 'SELECT A.EmployeeID FROM asset A where A.AssetID="' . $assetID . '"';
				//print_r($query_asset);
				$result_asset = mysql_exe_query(array($query_asset, 1));
				$r_now_asset = mysql_exe_fetch_array(array($result_asset, 1));
				//echo $r_now_asset[0];
				$employeeID = $r_now_asset[0];
				$wobaru = WORDER . '  AND WO.WorkTypeID<>"WT000002" AND( WO.RequestorID="' . $_SESSION['userID'] . '" OR AE.EmployeeID="' . $employeeID . '") ORDER BY WO.WorkOrderNo DESC';
				//echo $wobaru; 
				$field = gen_mysql_id($wobaru);
				//print_r($field) ;
				//-------get header pada sql----------
				$name = gen_mysql_head($wobaru);
				//print_r($name) ;

				//-------set header pada handson------
				//==========Timuraya================
				$sethead = "['Work_Order_No','Asset_No','Asset_Name','Problem Description','Work_Type','Section','Requested_Date','Required_Date','Plan_Date_Start','Plan_Date_End','Actual_Date_Start','Actual_Date_End','Work_Status'" . _USER_EDIT_SETHEAD_ . _USER_DELETE_SETHEAD_ . "]";
				//-------set id pada handson----------
				$setid = "[{data:'Work_Order_No',renderer: 'html',className: 'htLeft'},{data:'Asset_No',className: 'htLeft'},{data:'Asset_Name',className: 'htLeft'},{data:'Problem_Desc',className: 'htLeft'},{data:'Work_Type',className: 'htLeft'},{data:'Work_Trade',className: 'htLeft'},{data:'Receive_Date',className: 'htLeft'},{data:'Required_Date',className: 'htLeft'},{data:'Estimated_Date_Start',className: 'htLeft'},{data:'Estimated_Date_End',className: 'htLeft'},{data:'Actual_Date_Start',className: 'htLeft'},{data:'Actual_Date_End',className: 'htLeft'},{data:'Work_Status',renderer: 'html',className: 'htLeft'}" . _USER_EDIT_SETID_ . _USER_DELETE_SETID_ . "]";
				//-------get data pada sql------------
				$dt = array($wobaru, $field, array('Edit', 'Delete'), array(PATH_WORDER . EDIT, PATH_WORDER . DELETE), array(0), PATH_WORDER);
				$data = get_data_handson_func($dt);
				//'<pre>'.print_r($data).'</pre>';
				//----Fungsi memanggil data handsontable melalui javascript---
				$fixedcolleft = 1;
				$sethandson = array($sethead, $setid, $data, $width, $fixedcolleft);
			}
		}
	} elseif ($_SESSION['userID'] == '') {
		//-------get id pada sql -------------
		if (isset($_REQUEST['dashwoclose'])) {
			$wobaru = WORDER . ' AND WO.WorkTypeID<>"WT000002" AND (WO.WorkStatusID="WS000020") ORDER BY WO.WorkOrderNo DESC';
		} else if (isset($_REQUEST['dashwoact'])) {
			$wobaru = WORDER . ' AND WO.WorkTypeID<>"WT000002" AND WO.WorkStatusID NOT IN (SELECT WorkStatusID FROM work_status WHERE WorkStatusID="WS000020" OR WorkStatusID="WS000021") ORDER BY WO.WorkOrderNo DESC';
		} else if (isset($_REQUEST['dashwosync'])) {
			$wobaru = WORDER . ' AND WO.id_andon IN (SELECT WO.id_andon FROM wo_andon a join work_order WO on a.id_andon = WO.id_andon) ORDER BY WO.WorkOrderNo DESC';
		} else if (isset($_REQUEST['dashwonosync'])) {
			$wobaru = WORDER . ' AND WO.id_andon NOT IN (SELECT WO.id_andon FROM wo_andon a join work_order WO on a.id_andon = WO.id_andon) ORDER BY WO.WorkOrderNo DESC';
		} else {


			$wobaru = WORDER . '  AND WO.WorkTypeID<>"WT000002" ORDER BY WO.WorkOrderNo DESC';
		}
		$field = gen_mysql_id($wobaru);
		//-------get header pada sql----------
		$name = gen_mysql_head($wobaru);

		//-------set header pada handson------
		//==========Timuraya================
		$sethead = "['Work_Order_No','Asset_No','Asset_Name','Problem Description','Work_Type','Section','Requested_Date','Required_Date','Plan_Date_Start','Plan_Date_End','Actual_Date_Start','Actual_Date_End','Work_Status'" . _USER_EDIT_SETHEAD_ . _USER_DELETE_SETHEAD_ . "]";
		//-------set id pada handson----------
		$setid = "[{data:'Work_Order_No',renderer: 'html',className: 'htLeft'},{data:'Asset_No',className: 'htLeft'},{data:'Asset_Name',className: 'htLeft'},{data:'Problem_Desc',className: 'htLeft'},{data:'Work_Type',className: 'htLeft'},{data:'Work_Trade',className: 'htLeft'},{data:'Receive_Date',className: 'htLeft'},{data:'Required_Date',className: 'htLeft'},{data:'Estimated_Date_Start',className: 'htLeft'},{data:'Estimated_Date_End',className: 'htLeft'},{data:'Actual_Date_Start',className: 'htLeft'},{data:'Actual_Date_End',className: 'htLeft'},{data:'Work_Status',renderer: 'html',className: 'htLeft'}" . _USER_EDIT_SETID_ . _USER_DELETE_SETID_ . "]";
		//-------get data pada sql------------
		$dt = array($wobaru, $field, array('Edit', 'Delete'), array(PATH_WORDER . EDIT, PATH_WORDER . DELETE), array(0), PATH_WORDER);
		$data = get_data_handson_func($dt);
		//----Fungsi memanggil data handsontable melalui javascript---
		$fixedcolleft = 1;
		$sethandson = array($sethead, $setid, $data, $width, $fixedcolleft);
	}

	//--------fungsi hanya untuk meload data
	if (_VIEW_) $content .= get_handson($sethandson);
	//------------Jika ada halaman upload excel-------//
	if (isset($_REQUEST['upload'])) {
		$content = '<br/><div class="ade">UPLOAD WO DATA USING EXCEL</div>';
		$content .= '<div class="toptext" align="center">' . _USER_VIEW_ . _USER_INSERT_ . '</div>';
		//----- Buat Form Isian Edit Data Berikut-----
		$content .= '<br/><div class="form-style-1"><form action="' . PATH_WORDER . UPLOAD . POST . '" method="post" enctype="multipart/form-data">
							<fieldset><div class="card-header text-center">Upload Excel Employee</div>
								<table>
									<tr><td width="150" colspan="3"><span class="editlink"><a href="' . _ROOT_ . '/file/worder.xls">Download Excel Format</a></span></td></tr>
									<tr><td width="150"><span class="name"> Excel WO </td><td>:</td> </span></td><td>' . text_filebox(array('worder', '', 'false')) . '</td></tr>
									<tr><td></td><td></td><td><input class="form-submit" type="submit" value="Submit"></td></tr>
								</table>
							</fieldset>
							</form></div>';
		//------ Aksi ketika post upload data -----//
		if (isset($_REQUEST['post'])) {
			try {
				$typeupload = 1;
				$sizeupload = 1;
				$target_dir = _ROOT_ . '/file/';
				$target_file = $target_dir . basename($_FILES['worder']['name']);
				$filetype = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
				if ($filetype != 'xls') {
					$content .= '<div class="alert alert-danger" align="center">Sorry, only XLS files are allowed</div>';
					$typeupload = 0;
				}

				if ($_FILES['worder']['size'] > 50000) {
					$content .= '<div class="alert alert-danger" align="center">Sorry, your files is too large</div>';
					$sizeupload = 0;
				}

				if ($typeupload == 0 && $sizeupload == 0) {
					$content .= '<div class="alert alert-danger" align="center">Sorry, your file not uploaded</div>';
				} else {
					if (!move_uploaded_file($_FILES['worder']['tmp_name'], $target_file)) {
						throw new RuntimeException('<div class="alert alert-danger" align="center"> Failed to move uploaded file. Your file still open</div>.');
					} else {
						parseExcel($target_file, 0, 'worder');
						$content .= '<div class="alert alert-success" align="center"> The File ' . basename($_FILES['worder']['name']) . ' has been uploaded</div>';
					}
				}
			} catch (RuntimeException $e) {
				$content = $e->getMessage();
			}
		}
	}
	//------------Jika ada halaman tambah data-------//
	if (isset($_REQUEST['add'])) {
		$recdat = date('m/d/Y H:i'); //echo convert_date_time(array($recdat,1));
		$content = '<br/><div class="ade">ADD DATA FOR WORK ORDER</div>';
		$content .= '<div class="toptext" align="center">' . _USER_VIEW_ . _USER_INSERT_ . '</div>';

		//----- Jika status sebagai manager ---------------//
		if (_VIEW_ && _DELETE_ && _EDIT_ && _INSERT_) {
			$addassignto = '
					<td width="120"><span class="name"> Assign to </td><td>:</td><td>' . combo_je(array(COMEMPLOY, 'assign', 'assign', 180, '', $resultnow[9])) . '</td>
						<td width="20"><td>
						<td width="120"></td>
					</tr>
					';
		} else {
			$addassignto = '';
		}

		//----- Buat Form Isian Berikut-----
		//---- Query Plant ------//
		$option = '';
		$plant = 'SELECT PlantId, PlantCode FROM plant ORDER BY PlantCode';
		$result = mysql_exe_query(array($plant, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$plant_slc = '<select class="form-control" id="plant">' . $option . '</select>';

		//---- Query Asset No------//
		$option = '';
		$comasset = COMASSETSNO;
		$result = mysql_exe_query(array($comasset, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$comasset_slc = '<select class="form-control" id="asset" name="asset">' . $option . '</select>';

		//---- Query Asset Desc------//
		$option = '';
		$comasset = COMASSETSDESC;
		$result = mysql_exe_query(array($comasset, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$comasset_desc = $option;

		//---- Query Line------//
		$option = '';
		$comline = 'Select LineId,LineCode from line';
		$result = mysql_exe_query(array($comline, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$comline_desc = '<select class="form-control" id="line" name="line">' . $option . '</select>';

		//query datalist problem//
		$option = '';
		$problem = 'SELECT id,description from problem';
		$result = mysql_exe_query(array($problem, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[1] . '"></option>';
		}
		$problem_list = $option;

		//query datalist solution//
		$option = '';
		$action = 'SELECT id,description from solution';
		$result = mysql_exe_query(array($action, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[1] . '"></option>';
		}
		$action = $option;
		//Jika Ada Id_andon
		if ($_GET['rowid'] != '') {
			$id_andon = $_GET['rowid'];
			$wostate = 'WS000020';
			$actstart = convert_date_time(array($_REQUEST['start'], 2));
			$actstop = convert_date_time(array($_REQUEST['stop'], 2));
			$qwostate = 'SELECT WorkStatusID, WorkStatus FROM work_status WHERE WorkStatusID="WS000020"';
		} else {
			$id_andon = '';
			$wostate = '';
			$actstart = '';
			$actstop = '';
			$qwostate = COMWOSTAT;
		}

		//=================================================//
		//3.&&&&&&&&--Form ke 3. Buat Form Spare Part--&&&&//
		//=================================================//
		//---- Data Spare Part Request ------//
		$i = 1;
		$body = '';
		$q_data = QSPAREPART2 . ' AND WO.WorkOrderNo="' . $_REQUEST['rowid'] . '"';

		$result = mysql_exe_query(array($q_data, 1));
		while ($result_data_now = mysql_exe_fetch_array(array($result, 1))) {
			$body .= '
						<tr>
						<td>' . $i . '</td>
						<td>' . $result_data_now[0] . '</td>
						<td>' . $result_data_now[1] . '</td>
						<td>' . $result_data_now[3] . '</td>
						<td>' . $result_data_now[2] . '</td>
						<td><button class="btn btn-danger btn-rounded btn-fw" onclick="del_partreq(\'' . $_REQUEST['rowid'] . '\',\'' . $result_data_now[0] . '\')">Delete</td>
					</tr>
					';
			$i++;
		}

		$table = '
				<table id="part_request" class="table table-bordered" style="width:100%">
					<thead>
						<tr>
							<th> No </th>
							<th> Item Code </th>
							<th> Item Name </th>
							<th> Request Stock </th>
							<th> Available Stock </th>
							<th> Delete </th>
						</tr>
					</thead>
					<tbody>
						' . $body . '
					</tbody>	
				</table>
				';

		//---- Query Equipment Classification ------//
		$option = '';
		$q_cat = 'SELECT item_category_code, CONCAT(item_no_code," - ",item_category_description) FROM invent_item_categories ORDER BY item_no_code ASC';
		$result = mysql_exe_query(array($q_cat, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$eq_class = '<select class="form-control" id="eq_class_part">' . $option . '</select>';

		//---- Query Part Classification ------//
		$sp_class = '<select class="form-control" id="sp_class_part" name="spare"></select>';

		DEFINE('COMBSPAREWO', 'SELECT item_id, item_description FROM invent_item WHERE item_id NOT IN (SELECT itemspare FROM invent_item_work_order WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '")');

		$form_spare = '
							<div class="row">
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Spare Part Class : ' . $eq_class . '
									</div>
								</div>
								<div class="col">
									<div class="alert alert-secondary" role="alert">
									  Spare part : ' . $sp_class . '
									</div>
								</div>
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Request Quantity : <input type="text" class="form-control" id="requestqty" name="request" placeholder="Request Quantity"/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col"></div>
								<div class="col">
									<input type="hidden" id="wo_partreq" value="' . $_REQUEST['rowid'] . '" />
									<button type="button" id="add_partreq" class="btn btn-primary btn-block">Add Data</button>
									<div id="load_partreq" class="alert alert-warning" role="alert" style="margin-top:5px;">Loading ... </div>
								</div>
								<div class="col"></div>
							</div>
							<div style="margin-top:10px;">' . $table . '</div>';
		$sparepart .= '<div title="Spare Part" style="padding:10px">' . $form_spare . spare_part() . '</div>';
		//=================================================//
		//3.&&&&&&&&--Form ke 3. Buat Form Spare Part--&&&&//
		//=================================================//

		$content .= '<div class="easyui-tabs" style="width:800px;height:500px;margin:auto">
					<div title="Work Order" style="padding:10px">
					<br/><div class="form-style-2"><form action="' . PATH_WORDER . ADD . POST . '" method="post" enctype="multipart/form-data">
							<fieldset><div class="card-header text-center">Work Order</div>
							<input type="hidden" value="' . $id_andon . '" name="id_andon">
								<div class="row">
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Downtime : </span>' . datetime_je(array('recdate', $recdat, 180)) . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Required : </span>' . datetime_je(array('reqdate', $recdat, 180)) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Plant : </span>' . $plant_slc . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Asset No: </span>' . $comasset_slc . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col-md-6">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Line: </span>' . $comline_desc . '
										</div>
									</div>
									<div class="col-md-6">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;height:77px;">
										  <span class="name" id="asset_desc">Asset Description : </span>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Problem Description : </span><span><a href="' . PATH_PROBLEM . '&add=ok&create=createwo" title="Create New Problem"><i class="fa fa-plus fa-fw" style="color:green; font-size:13px">&nbsp;New</i></a></span><br><input type="text" name="prodesc" id="default" list="problem" placeholder="example Problem" style="width:100%;height:40px;">
											  <datalist id="problem">
											    ' . $problem_list . '
											  </datalist>
										  </span>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col-md-6">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Requested By : </span>' . combo_je(array(COMEMPLOY, 'request', 'request', '100%', '', '')) . '
										</div>
									</div>
									<div class="col-md-6">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Work Priority : </span>' . combo_je(array(COMWOPRIOR, 'woprior', 'woprior', '100%', '', '')) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col-md-6">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Work Type : </span>' . combo_je(array(COMWOTYPE, 'wotype', 'wotype', '100%', '', '')) . '
										</div>
									</div>
									<div class="col-md-6">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Department : </span>' . combo_je(array(LOCATNDEPART, 'department', 'department', '100%', '', '')) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col-md-6">
										<div class="alert alert-danger" role="alert" style="margin-bottom:0px;">
										  <span class="name">MU Section : </span>' . combo_je(array(COMWOTRADE, 'wotrade', 'wotrade', '100%', '', '')) . '
										</div>
									</div>
									<div class="col-md-6">
										<div class="alert alert-success" role="alert" style="margin-bottom:0px;">
										  <span class="name">Work Status : </span>' . combo_je(array($qwostate, 'wostat', 'wostat', '100%', '', $wostate)) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col-md-6">
										<div class="alert alert-danger" role="alert" style="margin-bottom:0px;">
										  <span class="name">Plan Start : </span>' . datetime_je(array('eststart', $recdat, 200)) . '
										</div>
									</div>
									<div class="col-md-6">
										<div class="alert alert-danger" role="alert" style="margin-bottom:0px;">
										  <span class="name">Plan Finish : </span>' . datetime_je(array('estend', $recdat, 200)) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col-md-6">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Start Repair : </span>' . datetime_je(array('actstart', $actstart, 200)) . '
										</div>
									</div>
									<div class="col-md-6">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Finish Repair : </span>' . datetime_je(array('actend', $actstop, 200)) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">K3 Identification : </span>' . text_je(array('ktiga', '', 'true', 'style="width:100%;height:40px"')) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Cause Description : </span><a type="button" class="btn btn-success btn-xs pull-right" id="add1" title="Tambah Baru" style="color:white;"><i class="fa fa-plus fa-fw"></i> Add row</a><br><br><input type="text"  name="cause[]" id="cause_a" style="width:100%;height:40px"> 
										  <div id="test2"></div>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Action Taken : </span><span><a href="' . PATH_SOLUTION . '&add=ok&create=createwo" title="Create New Problem"><i class="fa fa-plus fa-fw" style="color:green; font-size:13px">&nbsp;New</i></a></span><br><input type="text" name="action" id="default" list="action" placeholder="example action" style="width:100%;height:40px;">
											  <datalist id="action">
											    ' . $action . '
											  </datalist>
										  </span>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Prevention Taken : </span>' . text_je(array('prevent', '', 'true', 'style="width:100%;height:40px"')) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-danger" role="alert" >
										  <span class="name">Relevant Document : </span>' . text_filebox(array('image', '', 'false')) . '
										</div>
									</div>
									<div class="col">
										<div class="badge badge-primary">User/Prod</div></h1>
										<div class="badge badge-danger">Planner/Adm</div></h1>
										<div class="badge badge-warning">MU SPV/GL</div></h1>
									</div>
								</div>
								
								<table>
									<tr><td></td><td></td><td><input class="form-submit" type="submit" value="Submit"></td></tr>
								</table>
							</fieldset>
							</form></div></div>' . $sparepart . '</div>
							' . add_wo();
		//------ Aksi ketika post menambahkan data -----//
		if (isset($_REQUEST['post'])) {
			if (!empty($_REQUEST['recdate']) && !empty($_REQUEST['reqdate']) && !empty($_REQUEST['eststart']) && !empty($_REQUEST['estend'])) {
				//-- Generate a new id untuk kategori aset --//
				$result = mysql_exe_query(array(COUNTWORDER, 1));
				$resultnow = mysql_exe_fetch_array(array($result, 1));
				$numrow = $resultnow[0] + 1;
				$woid = get_new_code('WO', $numrow);
				//-- Insert data pada kategori aset --//
				$recdate = convert_date_time(array($_REQUEST['recdate'], 1));
				$reqdate = convert_date_time(array($_REQUEST['reqdate'], 1));
				$eststart = convert_date_time(array($_REQUEST['eststart'], 1));
				$estend = convert_date_time(array($_REQUEST['estend'], 1));
				$actstart = convert_date_time(array($_REQUEST['actstart'], 1));
				$actend = convert_date_time(array($_REQUEST['actend'], 1));
				$hanover = convert_date_time(array($_REQUEST['hanover'], 1));

				//--------Post Image File------------------
				if (!empty($_FILES['image']['name'])) {
					try {
						$typeupload = 1;
						$sizeupload = 1;
						$target_dir = _ROOT_ . 'file/workorder/';
						$target_file = $target_dir . basename($_FILES['image']['name']);
						$filetype = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
						$expensions = array("jpeg", "jpg");
						if (in_array($filetype, $expensions) === false) {
							$info .= '<div class="alert alert-danger" align="center">Sorry, only JPG or JPEG files are allowed</div>';
							$typeupload = 0;
						}

						if ($_FILES['image']['size'] > 500000) {
							$info .= '<div class="alert alert-danger" align="center">Sorry, your files is too large (Max 500KB)</div>';
							$sizeupload = 0;
						}

						if ($typeupload == 0 || $sizeupload == 0) {
							$info .= '<div class="alert alert-danger" align="center">Sorry, You havent upload image. Failed to upload</div>';
						} else {
							if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
								$info = '<div class="alert alert-danger" align="center"> You havent upload image. Failed to upload</div>.';
							} else {
								$info .= '<div class="alert alert-success" align="center"> The File ' . basename($_FILES['image']['name']) . ' has been uploaded</div>';
							}
						}
					} catch (RuntimeException $e) {
						$info = '<br/>' . $e->getMessage();
					}
				}

				//---Jika assign id yang update bukan manager maka---/
				if (empty($_REQUEST['assign'])) {
					$assign = 'EP000001';
				} else {
					$assign = $_REQUEST['assign'];
				}


				if (empty(basename($_FILES['image']['name']))) {
					if ($_GET['rowid'] != '') {

						$query = 'INSERT INTO work_order (WorkOrderNo,id_andon,DateReceived,DateRequired,EstDateStart,EstDateEnd,ActDateStart,ActDateEnd,AcceptBy,AssignID,CreatedID,RequestorID,AssetID,WorkTypeID,WorkPriorityID,WorkStatusID,WorkTradeID,FailureCauseID,ProblemDesc,CauseDescription,ActionTaken,PreventionTaken,Created_By,DepartmentID,identifyK3) VALUES("' . $woid . '","' . $_REQUEST['id_andon'] . '","' . $recdate . '","' . $reqdate . '","' . $eststart . '","' . $estend . '","' . $actstart . '","' . $actend . '","' . $_REQUEST['accept'] . '","' . $assign . '","EP000001","' . $_REQUEST['request'] . '","' . $_REQUEST['asset'] . '","' . $_REQUEST['wotype'] . '","' . $_REQUEST['woprior'] . '","' . $_REQUEST['wostat'] . '","' . $_REQUEST['wotrade'] . '","FL000001","' . $_REQUEST['prodesc'] . '","-","' . $_REQUEST['action'] . '","' . $_REQUEST['prevent'] . '","' . $_SESSION['user'] . '","' . $_REQUEST['department'] . '","' . $_REQUEST['ktiga'] . '")';
						$now = date("Y-m-d H:i:s");
						$query1 = 'INSERT INTO log_work_order (WorkOrderNo,PIC,date,description) VALUES("' . $woid . '","' . $_SESSION['user'] . '","' . $now . '","Insert WO")';
					} else {

						$query = 'INSERT INTO work_order (WorkOrderNo,id_andon,DateReceived,DateRequired,EstDateStart,EstDateEnd,ActDateStart,ActDateEnd,AcceptBy,AssignID,CreatedID,RequestorID,AssetID,WorkTypeID,WorkPriorityID,WorkStatusID,WorkTradeID,FailureCauseID,ProblemDesc,CauseDescription,ActionTaken,PreventionTaken,Created_By,DepartmentID,identifyK3) VALUES("' . $woid . '","' . $_REQUEST['id_andon'] . '","' . $recdate . '","' . $reqdate . '","' . $eststart . '","' . $estend . '","' . $actstart . '","' . $actend . '","' . $_REQUEST['accept'] . '","' . $assign . '","EP000001","' . $_REQUEST['request'] . '","' . $_REQUEST['asset'] . '","' . $_REQUEST['wotype'] . '","' . $_REQUEST['woprior'] . '","' . $_REQUEST['wostat'] . '","' . $_REQUEST['wotrade'] . '","FL000001","' . $_REQUEST['prodesc'] . '","-","' . $_REQUEST['action'] . '","' . $_REQUEST['prevent'] . '","' . $_SESSION['user'] . '","' . $_REQUEST['department'] . '","' . $_REQUEST['ktiga'] . '")';
						$now = date("Y-m-d H:i:s");
						$query1 = 'INSERT INTO log_work_order (WorkOrderNo,PIC,date,description) VALUES("' . $woid . '","' . $_SESSION['user'] . '","' . $now . '","Insert WO")';
					}
				} else {
					if ($_GET['rowid'] != '') {
						$query = 'INSERT INTO work_order (WorkOrderNo,id_andon,DateReceived,DateRequired,EstDateStart,EstDateEnd,ActDateStart,ActDateEnd,AcceptBy,AssignID,CreatedID,RequestorID,AssetID,WorkTypeID,WorkPriorityID,WorkStatusID,WorkTradeID,FailureCauseID,ProblemDesc,CauseDescription,ActionTaken,PreventionTaken,ImagePath,Created_By,DepartmentID,identifyK3) VALUES("' . $woid . '","' . $_REQUEST['id_andon'] . '","' . $recdate . '","' . $reqdate . '","' . $eststart . '","' . $estend . '","' . $actstart . '","' . $actend . '","' . $_REQUEST['accept'] . '","' . $assign . '","EP000001","' . $_REQUEST['request'] . '","' . $_REQUEST['asset'] . '","' . $_REQUEST['wotype'] . '","' . $_REQUEST['woprior'] . '","' . $_REQUEST['wostat'] . '","' . $_REQUEST['wotrade'] . '","FL000001","' . $_REQUEST['prodesc'] . '","-","' . $_REQUEST['action'] . '","' . $_REQUEST['prevent'] . '","' . $target_file . '","' . $_SESSION['user'] . '","' . $_REQUEST['department'] . '","' . $_REQUEST['ktiga'] . '")';
						$now = date("Y-m-d H:i:s");
						$query1 = 'INSERT INTO log_work_order (WorkOrderNo,PIC,date,description) VALUES("' . $woid . '","' . $_SESSION['user'] . '","' . $now . '","Insert WO")';
					} else {
						$query = 'INSERT INTO work_order (WorkOrderNo,id_andon,DateReceived,DateRequired,EstDateStart,EstDateEnd,ActDateStart,ActDateEnd,AcceptBy,AssignID,CreatedID,RequestorID,AssetID,WorkTypeID,WorkPriorityID,WorkStatusID,WorkTradeID,FailureCauseID,ProblemDesc,CauseDescription,ActionTaken,PreventionTaken,ImagePath,Created_By,DepartmentID,identifyK3,LineId) VALUES("' . $woid . '","' . $_REQUEST['id_andon'] . '","' . $recdate . '","' . $reqdate . '","' . $eststart . '","' . $estend . '","' . $actstart . '","' . $actend . '","' . $_REQUEST['accept'] . '","' . $assign . '","EP000001","' . $_REQUEST['request'] . '","' . $_REQUEST['asset'] . '","' . $_REQUEST['wotype'] . '","' . $_REQUEST['woprior'] . '","' . $_REQUEST['wostat'] . '","' . $_REQUEST['wotrade'] . '","FL000001","' . $_REQUEST['prodesc'] . '","-","' . $_REQUEST['action'] . '","' . $_REQUEST['prevent'] . '","' . $target_file . '","' . $_SESSION['user'] . '","' . $_REQUEST['department'] . '","' . $_REQUEST['ktiga'] . '","' . $_REQUEST['line'] . '")';
						$now = date("Y-m-d H:i:s");
						$query1 = 'INSERT INTO log_work_order (WorkOrderNo,PIC,date,description) VALUES("' . $woid . '","' . $_SESSION['user'] . '","' . $now . '","Insert WO")';
					}
				} //echo $query;
				mysql_exe_query(array($query, 1));
				mysql_exe_query(array($query1, 1));
				for ($i = 0; $i < count($_REQUEST['cause']); $i++) {
					if ($_REQUEST['cause'] != '') {
						$query2 = 'INSERT INTO cause_description (WorkOrderNo,WhyNo,WhyDesc) VALUES("' . $woid . '","' . $i . '","' . $_REQUEST['cause'][$i] . '")';
						mysql_exe_query(array($query2, 1));
					} else {
						$query2 = 'INSERT INTO cause_description (WorkOrderNo,WhyNo,WhyDesc) VALUES("' . $woid . '","' . $i . '","-")';
						mysql_exe_query(array($query2, 1));
					}
				}

				// mysql_exe_query(array($query2,1));
				//-- Ambil data baru dari database --//
				$querydat = WORDER . ' AND WorkOrderNo="' . $woid . '"';
				$content .= '<br/><div id="example1" style="width: 1335px; height: 80px; overflow: hidden; font-size=10px;"></div>';
				$width = "[200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,80]";
				$field = gen_mysql_id($querydat);
				$name = gen_mysql_head($querydat);
				$sethead = "['Work_Order_No','Asset_Name','Work_Type','Work_Status','Work_Priority','Work_Trade','Requested_Date','Required_Date','Plan_Date_Start','Plan_Date_End','Actual_Date_Start','Actual_Date_End','Requestor'" . _USER_EDIT_SETHEAD_ . "]";
				//-------set id pada handson----------
				$setid = "[{data:'Work_Order_No',renderer: 'html',className: 'htLeft'},{data:'Asset_Name',className: 'htLeft'},{data:'Work_Type',className: 'htLeft'},{data:'Work_Status',className: 'htLeft'},{data:'Work_Priority',className: 'htLeft'},{data:'Work_Trade',className: 'htLeft'},{data:'Receive_Date',className: 'htLeft'},{data:'Required_Date',className: 'htLeft'},{data:'Estimated_Date_Start',className: 'htLeft'},{data:'Estimated_Date_End',className: 'htLeft'},{data:'Actual_Date_Start',className: 'htLeft'},{data:'Actual_Date_End',className: 'htLeft'},{data:'Requestor',className: 'htLeft'}" . _USER_EDIT_SETID_ . "]";
				$dt = array($querydat, $field, array('Edit'), array(PATH_WORDER . EDIT), array());
				$data = get_data_handson_func($dt);
				$fixedcolleft = 0;
				$sethandson = array($sethead, $setid, $data, $width, $fixedcolleft);
				$content .= get_handson($sethandson) . $info;
			} else {
				$content .= '<div class="alert alert-danger" align="center">Some Field is Empty</div>';
			}
		}
	}
	if (isset($_REQUEST['edit'])) {
		$info = '';
		//------------Jika ada halaman edit data-------//
		if (isset($_REQUEST['post'])) {
			if (!empty($_REQUEST['recdate']) && !empty($_REQUEST['reqdate']) && !empty($_REQUEST['eststart']) && !empty($_REQUEST['estend'])) {
				//-- Update data pada kategori aset --//
				$recdate = convert_date_time(array($_REQUEST['recdate'], 1));
				$reqdate = convert_date_time(array($_REQUEST['reqdate'], 1));
				$eststart = convert_date_time(array($_REQUEST['eststart'], 1));
				$estend = convert_date_time(array($_REQUEST['estend'], 1));
				$actstart = convert_date_time(array($_REQUEST['actstart'], 1));
				$actend = convert_date_time(array($_REQUEST['actend'], 1));
				$hanover = convert_date_time(array($_REQUEST['hanover'], 1));

				//--------Post Image File------------------
				if (!empty($_FILES['image']['name'])) {
					try {
						$typeupload = 1;
						$sizeupload = 1;
						$target_dir = _ROOT_ . 'file/workorder/';
						$target_file = $target_dir . basename($_FILES['image']['name']);
						$filetype = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));
						$expensions = array("jpeg", "jpg");
						if (in_array($filetype, $expensions) === false) {
							$addinfo .= '<div class="alert alert-danger" align="center">Sorry, only JPG or JPEG files are allowed</div>';
							$typeupload = 0;
						}

						if ($_FILES['image']['size'] > 500000) {
							$addinfo .= '<div class="alert alert-danger" align="center">Sorry, your files is too large (Max 500KB)</div>';
							$sizeupload = 0;
						}

						if ($typeupload == 0 || $sizeupload == 0) {
							$addinfo .= '<div class="alert alert-danger" align="center">Sorry, You havent upload image. Failed to upload</div>';
						} else {
							if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_file)) {
								$addinfo = '<div class="alert alert-danger" align="center"> You havent upload image. Failed to upload</div>.';
							} else {
								$addinfo .= '<div class="alert alert-success" align="center"> The File ' . basename($_FILES['image']['name']) . ' has been uploaded</div>';
							}
						}
					} catch (RuntimeException $e) {
						$info = '<br/>' . $e->getMessage();
					}
				}

				//---Jika assign id yang update bukan manager maka---/
				if (empty($_REQUEST['assign']))
					$assign = '';
				else
					$assign = ',  AssignID="' . $_REQUEST['assign'] . '"';

				if (empty(basename($_FILES['image']['name']))) {
					$qstate = EDWORDER . ' WHERE WO.WorkOrderNo="' . $_REQUEST['rowid'] . '"';
					$restate = mysql_exe_query(array($qstate, 1));
					$rnstate = mysql_exe_fetch_array(array($restate, 1));
					$wostate = $rnstate['15'];
					if ($wostate == $_REQUEST['wostat']) {
						$query = 'UPDATE work_order SET DateReceived="' . $recdate . '", DateRequired="' . $reqdate . '", EstDateStart="' . $eststart . '", EstDateEnd="' . $estend . '", ActDateStart="' . $actstart . '", ActDateEnd="' . $actend . '", RequestorID="' . $_REQUEST['request'] . '", AssetID="' . $_REQUEST['asset'] . '", WorkTypeID="' . $_REQUEST['wotype'] . '", WorkPriorityID="' . $_REQUEST['woprior'] . '", WorkStatusID="' . $_REQUEST['wostat'] . '", WorkTradeID="' . $_REQUEST['wotrade'] . '", ProblemDesc="' . $_REQUEST['prodesc'] . '", CauseDescription="-", ActionTaken="' . $_REQUEST['action'] . '", PreventionTaken="' . $_REQUEST['prevent'] . '", Modified_By="' . $_SESSION['user'] . '", DepartmentID="' . $_REQUEST['department'] . '", identifyK3="' . $_REQUEST['ktiga'] . '" WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '"';
					} else {
						$date_mod = date('Y-m-d');
						$query = 'UPDATE work_order SET DateReceived="' . $recdate . '", DateRequired="' . $reqdate . '", EstDateStart="' . $eststart . '", EstDateEnd="' . $estend . '", ActDateStart="' . $actstart . '", ActDateEnd="' . $actend . '", RequestorID="' . $_REQUEST['request'] . '", AssetID="' . $_REQUEST['asset'] . '", WorkTypeID="' . $_REQUEST['wotype'] . '", WorkPriorityID="' . $_REQUEST['woprior'] . '", WorkStatusID="' . $_REQUEST['wostat'] . '", WorkTradeID="' . $_REQUEST['wotrade'] . '", ProblemDesc="' . $_REQUEST['prodesc'] . '", CauseDescription="-", ActionTaken="' . $_REQUEST['action'] . '", PreventionTaken="' . $_REQUEST['prevent'] . '", Modified_By="' . $_SESSION['user'] . '", State_modified_date="' . $date_mod . '", DepartmentID="' . $_REQUEST['department'] . '", identifyK3="' . $_REQUEST['ktiga'] . '" WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '"';
					}
				} else {
					$query = 'UPDATE work_order SET DateReceived="' . $recdate . '", DateRequired="' . $reqdate . '", EstDateStart="' . $eststart . '", EstDateEnd="' . $estend . '", ActDateStart="' . $actstart . '", ActDateEnd="' . $actend . '", RequestorID="' . $_REQUEST['request'] . '", AssetID="' . $_REQUEST['asset'] . '", WorkTypeID="' . $_REQUEST['wotype'] . '", WorkPriorityID="' . $_REQUEST['woprior'] . '", WorkStatusID="' . $_REQUEST['wostat'] . '", WorkTradeID="' . $_REQUEST['wotrade'] . '", ProblemDesc="' . $_REQUEST['prodesc'] . '", CauseDescription="-", ActionTaken="' . $_REQUEST['action'] . '", PreventionTaken="' . $_REQUEST['prevent'] . '", ImagePath="' . $target_file . '", DepartmentID="' . $_REQUEST['department'] . '", identifyK3="' . $_REQUEST['ktiga'] . '" WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '"';
				}

				//******************Insert log work order status**********************//
				$query_status = 'SELECT WorkStatus FROM work_status A, work_order B WHERE A.WorkStatusID=B.WorkStatusID AND WorkOrderNo="' . $_REQUEST['rowid'] . '"';
				$result_status = mysql_exe_query(array($query_status, 1));
				$r_now_status = mysql_exe_fetch_array(array($result_status, 1));
				$last_status = $r_now_status[0];

				$query_status = 'SELECT WorkStatus FROM work_status WHERE WorkStatusID="' . $_REQUEST['wostat'] . '"';
				$result_status = mysql_exe_query(array($query_status, 1));
				$r_now_status = mysql_exe_fetch_array(array($result_status, 1));
				$actual_status = $r_now_status[0];

				if ($last_status <> $actual_status) {
					$now = date("Y-m-d H:i:s");
					$query1 = 'INSERT INTO log_work_order (WorkOrderNo,PIC,date,description) VALUES("' . $_REQUEST['rowid'] . '","' . $_SESSION['user'] . '","' . $now . '","Update status WO from ' . $last_status . ' to ' . $actual_status . '")';
					mysql_exe_query(array($query1, 1));
				}

				mysql_exe_query(array($query, 1));
				$query_Delete = 'DELETE FROM cause_description where WorkOrderNo="' . $_REQUEST['rowid'] . '"';
				mysql_exe_query(array($query_Delete, 1));
				for ($i = 0; $i < count($_REQUEST['cause_e']); $i++) {
					// $query2 = 'UPDATE cause_description SET WorkOrderNo="'.$_REQUEST['rowid'].'",WhyNo="'.$i.'",WhyDesc="'.$_REQUEST['cause_e'][$i].'"  WHERE WorkOrderNo="'.$_REQUEST['rowid'].'"';
					// mysql_exe_query(array($query2,1));	
					if ($_REQUEST['cause_e'] != '') {
						$query2 = 'INSERT INTO cause_description (WorkOrderNo,WhyNo,WhyDesc) VALUES("' . $_REQUEST['rowid'] . '","' . $i . '","' . $_REQUEST['cause_e'][$i] . '")';
						mysql_exe_query(array($query2, 1));
					} else {
						$query2 = 'INSERT INTO cause_description (WorkOrderNo,WhyNo,WhyDesc) VALUES("' . $_REQUEST['rowid'] . '","' . $i . '","")';
						mysql_exe_query(array($query2, 1));
					}
				}
				//-- Ambil data baru dari database --//
				$querydat = WORDER . ' AND WorkOrderNo="' . $_REQUEST['rowid'] . '"';
				$info .= '<br/><div id="example1" style="width: 1335px; height: 80px; overflow: hidden; font-size=10px;"></div>';
				$width = "[200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,200,80]";
				$field = gen_mysql_id($querydat);
				$name = gen_mysql_head($querydat);
				$sethead = "['Work_Order_No','Asset_Name','Work_Type','Work_Status','Work_Priority','Work_Trade','Requested_Date','Required_Date','Plan_Date_Start','Plan_Date_End','Actual_Date_Start','Actual_Date_End','Requestor'" . _USER_EDIT_SETHEAD_ . "]";
				//-------set id pada handson----------
				$setid = "[{data:'Work_Order_No',renderer: 'html',className: 'htLeft'},{data:'Asset_Name',className: 'htLeft'},{data:'Work_Type',className: 'htLeft'},{data:'Work_Status',className: 'htLeft'},{data:'Work_Priority',className: 'htLeft'},{data:'Work_Trade',className: 'htLeft'},{data:'Receive_Date',className: 'htLeft'},{data:'Required_Date',className: 'htLeft'},{data:'Estimated_Date_Start',className: 'htLeft'},{data:'Estimated_Date_End',className: 'htLeft'},{data:'Actual_Date_Start',className: 'htLeft'},{data:'Actual_Date_End',className: 'htLeft'},{data:'Requestor',className: 'htLeft'}" . _USER_EDIT_SETID_ . "]";
				$dt = array($querydat, $field, array('Edit'), array(PATH_WORDER . EDIT), array());
				$data = get_data_handson_func($dt);
				$fixedcolleft = 0;
				$sethandson = array($sethead, $setid, $data, $width, $fixedcolleft);
				$info .= get_handson($sethandson) . $addinfo;
			} else {
				$info .= '<div class="alert alert-danger" align="center">Some Field is Empty</div>';
			}
		}
		//-----Ambil nilai semua data yang terkait dengan id data------//
		$querydat = EDWORDER . ' WHERE WO.WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		$result = mysql_exe_query(array($querydat, 1));
		$resultnow = mysql_exe_fetch_array(array($result, 1));
		$wonum = $resultnow[0];
		$recdat = convert_date_time(array($resultnow[1], 2));
		$reqdat = convert_date_time(array($resultnow[2], 2));
		$eststart = convert_date_time(array($resultnow[3], 2));
		$estend = convert_date_time(array($resultnow[4], 2));
		$actstart = convert_date_time(array($resultnow[5], 2));
		$actend = convert_date_time(array($resultnow[6], 2));
		$hanover = convert_date_time(array($resultnow[7], 2));
		$pmstart = convert_date_time(array($resultnow[22], 2));
		$pmcompleted = convert_date_time(array($resultnow[23], 2));
		$pmtask = $resultnow[24];
		$pmname = $resultnow[25];
		$department = $resultnow[26];
		$k3 = $resultnow[27];
		$lineId = $resultnow[28];
		//-----Cek if work type is preventive ----//
		$querycheck = 'SELECT WorkTypeDesc FROM work_type WHERE worktypeid="' . $resultnow[13] . '"';
		$resqcheck = mysql_exe_query(array($querycheck, 1));
		$resnowqcheck = mysql_exe_fetch_array(array($resqcheck, 1));
		if (strcmp($resnowqcheck[0], 'Preventive') == 0) {
			$addfield = '
								<tr>
									<td width="120"><span class="name"> PM Target Start</td><td>:</td><td>' . datetime_je(array('pmstart', $pmstart, 200)) . '</td>
									<td width="20"><td>
									<td width="120"><span class="name"> PM Target Completed </td><td>:</td><td>' . datetime_je(array('pmcompleted', $pmcompleted, 200)) . '</td>
									<td width="20"><td>
								</tr>
								<tr>
									<td width="120"><span class="name"> PM Name</td><td>:</td><td>' . combo_je(array(COMPMTASKL, 'pmname', 'pname', 180, '', $pmtask)) . '</td>
									<td width="20"><td>
									<td width="120"><span class="name"> PM Task </td><td>:</td><td>' . combo_je(array(COMBPMGENG, 'pmtask', 'pmtask', 180, '', $pmname)) . '</td>
									<td width="20"><td>
								</tr>
					';
		} else {
			$addfield = '';
		}

		//*********************Menggunakan fungsi create form******************//
		//2.&&&&---Form ke 2. Buat Form Step Of Work--&&&&
		//-----Eksekusi jika insert dilakukan--------
		if (isset($_REQUEST['stepwork'])) {
			//-- Insert data pada kategori aset --//
			$field = array(
				'WorkOrderNo',
				'ID_Document'
			);
			$value = array(
				'"' . $_REQUEST['rowid'] . '"',
				'"' . $_REQUEST['doc_data'] . '"'
			);
			$query = mysql_stat_insert(array('work_document_relation', $field, $value));
			mysql_exe_query(array($query, 1));
		}

		if (isset($_REQUEST['delstepwork']) && isset($_REQUEST['delete'])) {
			$con = 'WorkOrderNo="' . $_REQUEST['wo'] . '" AND ID_Document="' . $_REQUEST['rowid'] . '"';
			$sparepart = query_delete(array(PATH_WORDER . EDIT . '&rowid=' . $_REQUEST['wo'], 'work_document_relation', $con));
		}

		$query_doc = 'SELECT ID_Document, Document_Name FROM work_document WHERE ID_Document NOT IN (SELECT ID_Document FROM work_document_relation WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '") ORDER BY Document_Name ASC';
		$name_field = array('Step of Work');
		$input_type = array(
			combo_je(array($query_doc, 'doc_data', 'doc_data', 180, '', ''))
		);


		$signtofill = array('');
		$stepwork = '<div title="Step of Work" style="padding:10px">
								<div class="row"><div class="col">
									<button id="cl_step" class="btn btn-fw btn-outline-primary btn-sm float-right" href="#" role="button"><i class="fa fa-plus fa-fw"></i>Create New</button>
									<a id="cl_back" class="btn btn-fw btn-outline-primary btn-sm float-right" href="' . PATH_WORDER . EDIT . '&rowid=' . $_REQUEST['rowid'] . '" role="button"><i class="fa fa-arrow-left fa-fw"></i>Back</a>
								</div></div>
								<div id="step">' .
			create_form(array(TSTEPWORK, PATH_WORDER . EDIT . '&rowid=' . $_REQUEST['rowid'] . STEPWORK, 1, $name_field, $input_type, $signtofill)) .
			'</div>
								<div id="doc">
									<br/><div class="form-style-1">
									<fieldset><div class="card-header text-center">Document Step of Work</div>
										<table>
											<tr><td width="150"><span class="name"> Document Name </td><td>:</td></span></td><td>' . text_je(array('docname', '', 'false', '', 'docname')) . '</td></tr>
											<tr><td width="150"><span class="name"> Upload Document </td><td>:</td></span></td><td><input type="file" id="doc_upload" name="doc_file" /></td></tr>
											<tr><td></td><td></td><td><input id="sb_doc" class="form-submit" type="submit" value="Submit"></td></tr>
										</table>
									</fieldset>
									</div>
									<div>
									<table id="doc_work" class="table table-bordered" style="width:100%">
									</table>
									</div>
									<div id="sb_success" class="alert alert-success" role="alert">Success Upload</div>
									<div id="sb_failed" class="alert alert-danger" role="alert">Failed Input</div>
								</div>
							' . step_work();

		$querystep = 'SELECT W.ID_Document, W.Document_Name, W.Link FROM work_document W , work_document_relation R WHERE W.ID_Document=R.ID_Document AND R.WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		//-------set lebar kolom -------------
		$width = "[100,300,100,100]";
		//-------get id pada sql -------------
		$field = gen_mysql_id($querystep);
		//-------get header pada sql----------
		$name = gen_mysql_head($querystep);
		//-------set header pada handson------
		$sethead = "['Document ID','Document Name','Link'" . _USER_DELETE_SETHEAD_ . "]";
		//-------set id pada handson----------
		$setid = "[{data:'ID_Document',className: 'htLeft'},{data:'Document_Name',className: 'htLeft'},{data:'Link',renderer:'html'}" . _USER_DELETE_SETID_ . "]";
		//-------get data pada sql------------
		$dt = array($querystep, $field, array('Delete'), array(PATH_WORDER . EDIT . '&wo=' . $_REQUEST['rowid'] . '&delstepwork=ok&delete=ok'), array());
		$data = get_data_handson_func($dt);
		//-------Encode ke HTML versi handsontable-----------------// 
		$data = str_replace("',Delete:", "\">Download</a></span>',Delete:", $data);
		$data = str_replace("Link:'", "Link:'<span class=\"editlink\"><a href=\"page/Sisoft/", $data);
		//----Fungsi memanggil data handsontable melalui javascript---
		$fixedcolleft = 0;
		$sethandson = array($sethead, $setid, $data, $width, $fixedcolleft, 'step_work');
		//--------fungsi hanya untuk meload data
		$stepwork .= '
							<div id="step_work" style="width: 780px; height: 280px; overflow: hidden; font-size=10px;"></div>' . get_handson_id($sethandson) . '</div>';

		//3.&&&&&&&&--Form ke 3. Buat Form Spare Part--&&&&
		//---- Data Spare Part Request ------//
		$i = 1;
		$body = '';
		$q_data = QSPAREPART2 . ' AND WO.WorkOrderNo="' . $_REQUEST['rowid'] . '"';

		$result = mysql_exe_query(array($q_data, 1));
		while ($result_data_now = mysql_exe_fetch_array(array($result, 1))) {
			$body .= '
						<tr>
						<td>' . $i . '</td>
						<td>' . $result_data_now[0] . '</td>
						<td>' . $result_data_now[1] . '</td>
						<td>' . $result_data_now[3] . '</td>
						<td>' . $result_data_now[2] . '</td>
						<td><button class="btn btn-danger btn-rounded btn-fw" onclick="del_partreq(\'' . $_REQUEST['rowid'] . '\',\'' . $result_data_now[0] . '\')">Delete</td>
					</tr>
					';
			$i++;
		}

		$table = '
				<table id="part_request" class="table table-bordered" style="width:100%">
					<thead>
						<tr>
							<th> No </th>
							<th> Item Code </th>
							<th> Item Name </th>
							<th> Request Stock </th>
							<th> Available Stock </th>
							<th> Delete </th>
						</tr>
					</thead>
					<tbody>
						' . $body . '
					</tbody>	
				</table>
				';

		//---- Query Equipment Classification ------//
		$option = '';
		$q_cat = 'SELECT item_category_code, CONCAT(item_no_code," - ",item_category_description) FROM invent_item_categories ORDER BY item_no_code ASC';
		$result = mysql_exe_query(array($q_cat, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$eq_class = '<select class="form-control" id="eq_class_part">' . $option . '</select>';

		//---- Query Part Classification ------//
		$sp_class = '<select class="form-control" id="sp_class_part" name="spare"></select>';

		DEFINE('COMBSPAREWO', 'SELECT item_id, item_description FROM invent_item WHERE item_id NOT IN (SELECT itemspare FROM invent_item_work_order WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '")');

		$form_spare = '
							<div class="row">
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Spare Part Class : ' . $eq_class . '
									</div>
								</div>
								<div class="col">
									<div class="alert alert-secondary" role="alert">
									  Spare part : ' . $sp_class . '
									</div>
								</div>
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Request Quantity : <input type="text" class="form-control" id="requestqty" name="request" placeholder="Request Quantity"/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col"></div>
								<div class="col">
									<input type="hidden" id="wo_partreq" value="' . $_REQUEST['rowid'] . '" />
									<button type="button" id="add_partreq" class="btn btn-primary btn-block">Add Data</button>
									<div id="load_partreq" class="alert alert-warning" role="alert" style="margin-top:5px;">Loading ... </div>
								</div>
								<div class="col"></div>
							</div>
							<div style="margin-top:10px;">' . $table . '</div>';
		$sparepart .= '<div title="Spare Part" style="padding:10px">' . $form_spare . spare_part() . '</div>';

		//4.&&&&&&&&--Form ke 4. Buat Form Man Power--&&&&
		//---- Query Man Power in WO ------//
		$i = 1;
		$body = '';
		$q_data = QMANPOWER . ' AND WO.WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		$result = mysql_exe_query(array($q_data, 1));
		while ($result_data_now = mysql_exe_fetch_array(array($result, 1))) {
			$body .= '
						<tr>
						<td>' . $i . '</td>
						<td>' . $result_data_now[2] . '</td>
						<td>Rp ' . number_format($result_data_now[3], 2, ',', '.') . '</td>
						<td>' . $result_data_now[4] . '</td>
						<td>' . $result_data_now[5] . '</td>
						<td><button class="btn btn-danger btn-rounded btn-fw" onclick="del_man_power(\'' . $_REQUEST['rowid'] . '\',\'' . $result_data_now[0] . '\',\'' . $result_data_now[4] . '\',\'' . $result_data_now[5] . '\')">Delete</td>
					</tr>
					';
			$i++;
		}

		$table = '
				<table id="part_man_power" class="table table-bordered" style="width:100%">
					<thead>
						<tr>
							<th> No </th>
							<th> Employee Name </th>
							<th> Cost Hour </th>
							<th> Start Date </th>
							<th> Finish Date </th>
							<th> Delete </th>
						</tr>
					</thead>
					<tbody>
						' . $body . '
					</tbody>	
				</table>
				';
		if (isset($_REQUEST['delmanpow']) && isset($_REQUEST['delete'])) {
			$con = 'WorkOrderNo="' . $_REQUEST['wo'] . '" AND EmployeeID="' . $_REQUEST['rowid'] . '"';
			$manpower = query_delete(array(PATH_WORDER . EDIT . '&rowid=' . $_REQUEST['wo'], 'work_order_manpower', $con));
		}
		$option = '';
		$q_cat = 'SELECT EmployeeID, FirstName FROM employee ORDER BY FirstName ASC';
		$result = mysql_exe_query(array($q_cat, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$eq_class = '<select class="form-control" id="employee_man" name="employee_man">' . $option . '</select>';

		//---- Query Man Power Not In Use WO------//	
		DEFINE('COMBMANPOW', 'SELECT EmployeeID, FirstName FROM employee WHERE EmployeeID NOT IN (SELECT EmployeeID FROM work_order_manpower WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '") ORDER BY FirstName ASC');

		$setdate = date('Y-m-d');
		$settime = date('H:i');

		$form_man = '
							<div class="row">
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Employee Name : ' . $eq_class . '
									</div>
								</div>
								
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Cost Hour : <input type="text" class="form-control" id="costhour" name="costhour" placeholder="Cost Hour"/>
									</div>
								</div>
								
							</div>
							<div class="row">
							<div class="col">
									<div class="alert alert-primary" role="alert">
									  Start Date : <input type="date" class="form-control" id="tglmulai" name="tglmulai" value="' . $setdate . '"/><input type="time" class="form-control" id="timemulai" name="timemulai" value="' . $settime . '"/>
									</div>
								</div>
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Finish Date : <input type="date" class="form-control" id="tglslsai" name="tglslsai" value="' . $setdate . '"/><input type="time" class="form-control" id="timeslsai" name="timeslsai" value="' . $settime . '"/>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col"></div>
								<div class="col">
									<input type="hidden" id="manpower_id" value="' . $_REQUEST['rowid'] . '" />
									<button type="button" id="add_tabel" class="btn btn-primary btn-block">Add Data</button>
									<div id="load_tabel" class="alert alert-warning" role="alert" style="margin-top:5px;">Loading ... </div>
								</div>
								<div class="col"></div>
							</div>
							<div style="margin-top:10px;">' . $table . '</div>';
		$manpower .= '<div title="Man Power" style="padding:10px">' . $form_man . man_power() . '</div>';
		//5.&&&&&&&&--Form ke 5. Buat Form Total Expense--&&&&
		if (isset($_REQUEST['expense'])) {
			$field = array(
				'TotalExpense'
			);
			$value = array(
				'"' . $_REQUEST['totalexp'] . '"'
			);
			$query = mysql_stat_update(array('work_order', $field, $value, 'WorkOrderNo="' . $_REQUEST['rowid'] . '"'));
			mysql_exe_query(array($query, 1));
		}
		$queryexp = 'SELECT TotalExpense FROM work_order WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		$resexp = mysql_exe_query(array($queryexp, 1));
		$resnowexp = mysql_exe_fetch_array(array($resexp, 1));
		$name_field = array('Total Expense');
		$input_type = array(
			text_je(array('totalexp', $resnowexp[0], 'false'))
		);
		$signtofill = array('<span style="color:red; font-size:12;"> Number</span>');
		$totalexp = '<div title="Total Expense" style="padding:10px">' . create_form(array(TMANPOWER, PATH_WORDER . EDIT . '&rowid=' . $_REQUEST['rowid'] . TEXP, 1, $name_field, $input_type, $signtofill)) . '</div>';

		//6.&&&&&&&&--Form ke 6. Failure Analysis--&&&&
		$queryexp = 'SELECT AssetID FROM work_order WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		$resexp = mysql_exe_query(array($queryexp, 1));
		$resnowexp = mysql_exe_fetch_array(array($resexp, 1));
		$qserv = ASSETS . ' AND A.AssetID="' . $resnowexp[0] . '"';
		$rqserv = mysql_exe_query(array($qserv, 1));
		$resqserv = mysql_exe_fetch_array(array($rqserv, 1));

		//---- Query Equipment Classification ------//
		$option = '';
		$q_cat = 'SELECT item_category_code, CONCAT(item_no_code," - ",item_category_description) FROM invent_item_categories ORDER BY item_no_code ASC';
		$result = mysql_exe_query(array($q_cat, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
		}
		$eq_class = '<select class="form-control" id="eq_class">' . $option . '</select>';

		//---- Query Part Classification ------//
		$sp_class = '<select class="form-control" id="sp_class"></select>';

		//---- Query Failure Code ------//
		$query_code = 'SELECT FailureCauseID FROM work_order WHERE WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		$result = mysql_exe_query(array($query_code, 1));
		$result_now = mysql_exe_fetch_array(array($result, 1));
		$code = $result_now[0];

		$option = '';
		$q_flcode = 'SELECT FailureCauseID, CONCAT(FailureCauseCode," - ",FailureCauseDesc) FROM failure_cause';
		$result = mysql_exe_query(array($q_flcode, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			if ($result_now[0] == $code)
				$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
			else
				$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
		}
		$eq_flcode = '<select class="form-control" id="eq_flcode">' . $option . '</select>';

		//---- Data Equipment Classification ------//
		$i = 1;
		$body = '';
		$q_data = 'SELECT C.item_no_code, C.item_category_description, I.item_id, item_description FROM invent_item I, work_order W, invent_item_categories C, work_failure_analysis S WHERE S.item_id=I.item_id AND  I.item_category_code=C.item_category_code AND S.WorkOrderNo=W.WorkOrderNo AND W.WorkOrderNo="' . $_REQUEST['rowid'] . '"';
		$result = mysql_exe_query(array($q_data, 1));
		while ($result_data_now = mysql_exe_fetch_array(array($result, 1))) {
			$body .= '
						<tr>
						<td>' . $i . '</td>
						<td>' . $result_data_now[0] . '</td>
						<td>' . $result_data_now[1] . '</td>
						<td>' . $result_data_now[2] . '</td>
						<td>' . $result_data_now[3] . '</td>
						<td><button class="btn btn-danger btn-rounded btn-fw" onclick="del_eqclass(\'' . $result_data_now[2] . '\')">Delete</td>
					</tr>
					';
			$i++;
		}

		$table = '
				<table id="fail_analisys" class="table table-bordered" style="width:100%">
					<thead>
						<tr>
							<th> No </th>
							<th> Item Class Code </th>
							<th> Item Class Description </th>
							<th> Item Code </th>
							<th> Item Descriptions </th>
							<th> Delete </th>
						</tr>
					</thead>
					<tbody>
						' . $body . '
					</tbody>	
				</table>
				';

		$data_svc = '
							<input type="hidden" id="temp_wo" value="' . $_REQUEST['rowid'] . '" />
							<div class="row">
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Failure Code : ' . $eq_flcode . '
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  SITE : ' . $resqserv[21] . '
									</div>
								</div>
								<div class="col">
									<div class="alert alert-secondary" role="alert">
									  PLANT : ' . $resqserv[22] . '
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="alert alert-secondary" role="alert">
									  PROCESS : ' . $resqserv[3] . '
									</div>
								</div>
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  UNIT : ' . $resqserv[5] . '
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col">
									<div class="alert alert-primary" role="alert">
									  Item Class : ' . $eq_class . '
									</div>
								</div>
								<div class="col">
									<div class="alert alert-secondary" role="alert">
									  Item : ' . $sp_class . '
									</div>
								</div>
							</div>
							
							<div class="row">
								<div class="col"></div>
								<div class="col">
									<button type="button" id="add_class" class="btn btn-primary btn-block">Add Data</button>
								</div>
								<div class="col"></div>
							</div>
							<div style="margin-top:10px;">' . $table . '</div>';

		$servicereq = '<div title="Failure Analysis" style="padding:10px">' . $data_svc . '</div>' . failure_analysis();

		//-----INDUK FORM----------------------------
		//-----Form ke 1. Buat Form Work Order-----
		//-----Tampilan judul pada pengeditan------
		$content = '<br/><div class="ade">EDIT DATA WORK ORDER FOR ' . $wonum . '</div>';
		$content .= '<div class="toptext" align="center">' . _USER_VIEW_ . _USER_PRINT_ . '</div>';
		//----- Jika status sebagai manager ---------------//
		if (_VIEW_ && _DELETE_ && _EDIT_ && _INSERT_) {
			$addassignto = '
					<td width="120"><span class="name"> Assign to </td><td>:</td><td>' . combo_je(array(COMEMPLOY, 'assign', 'assign', 180, '', $resultnow[9])) . '</td>
						<td width="20"><td>
						<td width="120"></td>
					</tr>
					';
		} else {
			$addassignto = '';
		}
		//----- Buat Form Isian Edit Data Berikut-----
		//---- Query Plant ------//
		$get_plantid = 'SELECT PlantID FROM asset WHERE AssetID="' . $resultnow[12] . '"';
		$r_plantid = mysql_exe_query(array($get_plantid, 1));
		$rn_plantid = mysql_exe_fetch_array(array($r_plantid, 1));
		$plantid = $rn_plantid[0];

		$option = '';
		$plant = 'SELECT PlantId, PlantCode FROM plant ORDER BY PlantCode';
		$result = mysql_exe_query(array($plant, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			if ($result_now[0] == $plantid) {
				$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
			} else {
				$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
			}
		}
		$plant_slc = '<select class="form-control" id="plant">' . $option . '</select>';

		//---- Query Line ------//
		$get_lineid = 'SELECT LineId FROM asset WHERE AssetID="' . $resultnow[12] . '"';
		$r_lineid = mysql_exe_query(array($get_lineid, 1));
		$rn_lineid = mysql_exe_fetch_array(array($r_lineid, 1));
		$lineid = $rn_lineid[0];

		$option = '';
		$line = 'SELECT LineId, LineCode FROM line ORDER BY LineCode';
		$result = mysql_exe_query(array($line, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			if ($result_now[0] == $lineid) {
				$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
			} else {
				$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
			}
		}
		$line_slc = '<select class="form-control" id="line" name="line">' . $option . '</select>';

		//---- Query Asset ------//
		$option = '';
		$comasset = COMASSETSNO;
		$desc = '';
		$result = mysql_exe_query(array($comasset, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			if ($result_now[0] == $resultnow[12]) {
				$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
				$desc = $result_now[1];
			} else {
				$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
			}
		}
		$comasset_slc = '<select class="form-control" id="asset" name="asset">' . $option . '</select>';

		//---- Query Asset Desc------//
		$option = '';
		$comasset = COMASSETSDESC;
		$result = mysql_exe_query(array($comasset, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			if ($result_now[0] == $resultnow[12]) {
				$option .= '<option value="' . $result_now[0] . '" selected>' . $result_now[1] . '</option>';
				$desc = $result_now[1];
			} else {
				$option .= '<option value="' . $result_now[0] . '">' . $result_now[1] . '</option>';
			}
		}
		$comasset_desc = '<select class="form-control" id="assdesc" name="asset_desc">' . $option . '</select>';
		//---- Query Cause Description------//
		$option = '';
		$cause_desc = 'SELECT WorkOrderNo,WhyDesc FROM cause_description WHERE WorkOrderNo="' . $resultnow[0] . '"';

		$result = mysql_exe_query(array($cause_desc, 1));

		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {

			if ($result_now[1] != '') {
				$option .= '<div id="test_e"><input type="text" id="cause_e"  name="cause_e[]" style="width:90%;height:40px;margin-top:2px;" value="' . $result_now[1] . '"><a type="button" class="btn btn-danger btn-xs" id="remove_e" title="Remove" style="color:white;margin-left:2px;"><i class="fa fa-trash fa-fw"></i></a></div>';
			} elseif ($result_now[0] || $result_now[1] == '') {
				$option .= '<br><br><input type="text"  name="cause_e[]" id="cause_e" style="width:100%;height:40px"><div id="test_e"></div>';
			}
		}
		$field_desc = '<div id="parent_test_e">' . $option . '</div>';
		//query datalist problem//
		$option = '';
		$problem = 'SELECT id,description from problem';
		$result = mysql_exe_query(array($problem, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[1] . '"></option>';
		}
		$problem_list = $option;

		//query datalist solution//
		$option = '';
		$action = 'SELECT id,description from solution';
		$result = mysql_exe_query(array($action, 1));
		while ($result_now = mysql_exe_fetch_array(array($result, 1))) {
			$option .= '<option value="' . $result_now[1] . '"></option>';
		}
		$action = $option;
		//--- Get Current Status -----//
		$q_stat = 'SELECT WorkStatusID, WorkStatus FROM work_status WHERE WorkStatusID="' . $resultnow[15] . '"';
		$r_stat = mysql_exe_query(array($q_stat, 1));
		$rn_stat = mysql_exe_fetch_array(array($r_stat, 1));
		$statusid_res = $rn_stat[0];
		$status_res = $rn_stat[1];
		//--- Jika grup adalah administrator dan status adalah close maka atau grup level 1 dan level 0 dan status adalah---
		if (($_SESSION['groupID'] != "GROUP181120033150" and $statusid_res == "WS000020") or (($_SESSION['groupID'] == "GROUP201103104941" or $_SESSION['groupID'] == "GROUP181120025602") and ($statusid_res == "WS000010" or $statusid_res == "WS000012" or $statusid_res == "WS000013" or $statusid_res == "WS000014" or $statusid_res == "WS000019"))) {
			$submit = '';
		} else {
			$submit = '<input class="form-submit" type="submit" value="Submit">';
		}

		$content .= '<div class="easyui-tabs" style="width:800px;height:500px;margin:auto">
							<div title="Work Order" style="padding:10px">
							<br/><div class="form-style-2"><form action="' . PATH_WORDER . EDIT . '&rowid=' . $_REQUEST['rowid'] . POST . '" method="post" enctype="multipart/form-data">
							<fieldset><div class="card-header text-center">Work Order</div>
								<div class="row">
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Downtime : </span>' . datetime_je(array('recdate', $recdat, 180)) . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Required : </span>' . datetime_je(array('reqdate', $recdat, 180)) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Plant : </span>' . $plant_slc . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Asset : </span>' . $comasset_slc . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Line : </span>' . $line_slc . '
										</div>
									</div>
									
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;height:77px;">
										  <span class="name" id="asset_desc">Asset Description : ' . $desc . '</span>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Problem Description : </span><span><a href="' . PATH_PROBLEM . '&add=ok&mod=modwo&rowid=' . $_REQUEST['rowid'] . '" title="Create New Problem"><i class="fa fa-plus fa-fw" style="color:green; font-size:13px">&nbsp;New</i></a></span><br><input type="text" name="prodesc" id="default" list="problem" placeholder="example Problem" style="width:100%;height:40px;" value="' . $resultnow[18] . '">
										  <datalist id="problem">
											' . $problem_list . '
										  </datalist>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Requested By : </span>' . combo_je(array(COMEMPLOY, 'request', 'request', '80%', '', $resultnow[11])) . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Work Priority : </span>' . combo_je(array(COMWOPRIOR, 'woprior', 'woprior', '80%', '', $resultnow[14])) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Work Type : </span>' . combo_je(array(COMWOTYPE, 'wotype', 'wotype', '80%', '', $resultnow[13])) . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-primary" role="alert" style="margin-bottom:0px;">
										  <span class="name">Department : </span>' . combo_je(array(LOCATNDEPART, 'department', 'department', '80%', '', $resultnow[26])) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-danger" role="alert" style="margin-bottom:0px;">
										  <span class="name">MU Section : </span>' . combo_je(array(COMWOTRADE, 'wotrade', 'wotrade', '80%', '', $resultnow[16])) . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-success" role="alert" style="margin-bottom:0px;">
											<div class="row">
												<div class="col">
													<span class="name">Current Status : </span>' . text_je(array('cur', $status_res, 'false', 'style="width:80%;height:22px" disabled')) . '
												</div>
												<div class="col">
													<span class="name">Update Status : </span>' . combo_je(array(COMWOSTAT, 'wostat', 'wostat', '80%', '', $resultnow[15], $disabled)) . '
												</div>
											</div>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-danger" role="alert" style="margin-bottom:0px;">
										  <span class="name">Plan Start : </span>' . datetime_je(array('eststart', $eststart, 200)) . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-danger" role="alert" style="margin-bottom:0px;">
										  <span class="name">Plan Finish : </span>' . datetime_je(array('estend', $estend, 200)) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Start Repair : </span>' . datetime_je(array('actstart', $actstart, 200)) . '
										</div>
									</div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Finish Repair : </span>' . datetime_je(array('actend', $actend, 200)) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">K3 Identification : </span>' . text_je(array('ktiga', $k3, 'true', 'style="width:100%;height:40px"')) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										<span class="name">Cause Description : </span><a type="button" class="btn btn-success btn-xs pull-right" id="add2" title="Tambah Baru" style="color:white;"><i class="fa fa-plus fa-fw"></i> Add row</a>' . $field_desc . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Action Taken : </span><span><a href="' . PATH_SOLUTION . '&add=ok&mod=modwo&rowid=' . $_REQUEST['rowid'] . '" title="Create New Problem"><i class="fa fa-plus fa-fw" style="color:green; font-size:13px">&nbsp;New</i></a></span><br><input type="text" name="action" id="default" list="action" placeholder="example action" style="width:100%;height:40px;" value="' . $resultnow[20] . '">
										  <datalist id="action">
											' . $action . '
										  </datalist>
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-warning" role="alert" style="margin-bottom:0px;">
										  <span class="name">Prevention Taken : </span>' . text_je(array('prevent', $resultnow[21], 'true', 'style="width:100%;height:40px"')) . '
										</div>
									</div>
									<div class="w-100"></div>
									<div class="col">
										<div class="alert alert-danger" role="alert" >
										  <span class="name">Relevant Document : </span>' . text_filebox(array('image', '', 'false')) . '
										</div>
									</div>
									<div class="col">
										<div class="badge badge-primary">User/Prod</div></h1>
										<div class="badge badge-danger">Planner/Adm</div></h1>
										<div class="badge badge-warning">MU SPV/GL</div></h1>
									</div>
								</div>
								<table>
									<tr><td></td><td></td><td>' . $submit . '</td></tr>
								</table>
							</fieldset>
							</form></div></div>
							' . $stepwork . $sparepart . $manpower/*.$totalexp*/ . $servicereq . '
							</div>' . add_wo();
		$content .= $info;
	}
	if (isset($_REQUEST['print'])) {
		$content = get_print(array('workderdoc', $_REQUEST['wo']));
	}

	return $content;
}
function step_work()
{
	$content = "<script>
						$('#doc').hide();
						$('#cl_back').hide();
						$('#sb_success').hide();
						$('#sb_failed').hide();
						$('#doc_work').hide();
						
						$('#cl_step').on('click',function(){
							$('#cl_step').hide();
							$('#cl_back').show();
							$('#step').hide();
							$('#doc').show();
							$('#sb_success').hide();
							$('#sb_failed').hide();
							$('#step_work').hide();
							$('#doc_work').show();
							
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/list_doc_work.php',
								data:data,
								crossDomain:true,
								cache:false,
								success:function(data){
									$('#doc_work').append(data);
								}
							})
						})
						
						/*$('#cl_back').on('click',function(){
							$('#cl_step').show();
							$('#cl_back').hide();
							$('#step').show();
							$('#doc').hide();
							$('#sb_success').hide();
							$('#sb_failed').hide();
							$('#dock_work').hide();
							$('#step_work').show();
							$('#doc_work').empty();
						})*/
						
						$('#sb_doc').on('click',function(){
							var docname = $('#docname').val();
							var fd = new FormData();
							var files = $('#doc_upload')[0].files[0];
							fd.append('file',files); 
							fd.append('docname',docname);
							$('#doc_work').empty();
							
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_upload_doc.php',
								data:fd,
								contentType: false,
								processData: false,
								success:function(data){
									$('#docname').val('');
									$('#doc_upload').val('');
									$('#doc_work').append(data);
								}
							})
							
						})
						
						function del_doc(id){
							$('#doc_work').empty();
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_delete_doc.php',
								data:{'id':id},
								crossDomain:true,
								cache:false,
								success:function(data){
									$('#doc_work').append(data);
								}
							})
						}
						
					</script>
		";
	return $content;
}

function spare_part()
{
	$content = "<script>
						$('#part_request').DataTable();
						
						$(document).ready(function(){
							$('#load_partreq').hide();
						})
						
						$('#add_partreq').on('click',function(){
							$('#part_request').empty();
							var wo = $('#wo_partreq').val(); 
							var eq_class_part = $('#eq_class_part').val(); 
							var sp_class_part = $('#sp_class_part').val(); 
							var request = $('#requestqty').val(); 
							
							var dataString = {'wo':wo,'sp_class_part':sp_class_part,'request':request};
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/list_partreq.php',
								data:dataString,
								crossDomain:true,
								cache:false,
								beforeSend: function(){
									$('#load_partreq').show();
								},
								success:function(data){
									$('#load_partreq').hide();
									//alert(data);
									$('#part_request').append(data);
									$('#requestqty').val('');
								}
							})
						})
						
						function del_partreq(wo,id){
							$('#part_request').empty(); 
							var id = id; 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/delete_list_partreq.php',
								data:{'wo':wo,'id':id},
								crossDomain:true,
								cache:false,
								beforeSend: function(){
									$('#load_partreq').show();
								},
								success:function(data){
									$('#load_partreq').hide();
									//alert(data);
									$('#part_request').append(data);
								}
							})
						}
						
						$('#eq_class_part').on('change',function(){
							$('#sp_class_part').empty();
							var cat = $('#eq_class_part').val();
							var temp_wo = ''; 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_category_change.php',
								data:{'cat':cat,'wo':temp_wo},
								crossDomain:true,
								cache:false,
								success:function(data){
									//alert(data);
									$('#sp_class_part').append(data);
								}
							})
						})
					</script>
		";

	return $content;
}

function man_power()
{
	$content = "<script>		
						$(document).ready(function(){
							$('#load_tabel').hide();
							$('#part_man_power').DataTable();
						})
						$('#add_tabel').on('click',function(){
							$('#part_man_power').empty();
							var manpower_id = $('#manpower_id').val(); 
							var employee_man = $('#employee_man').val(); 
							var costhour = $('#costhour').val(); 
							var tglmulai = $('#tglmulai').val(); 
							var tglslsai = $('#tglslsai').val(); 
							var timemulai = $('#timemulai').val(); 
							var timeslsai = $('#timeslsai').val(); 
							
							var dataString = {'manpower_id':manpower_id,'employee_man':employee_man,'costhour':costhour,'tglmulai':tglmulai,'tglslsai':tglslsai,'timemulai':timemulai,'timeslsai':timeslsai};
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/list_man_power.php',
								data:dataString,
								crossDomain:true,
								cache:false,
								beforeSend: function(){
									$('#load_tabel').show();
								},
								success:function(data){
									$('#load_tabel').hide();
									//alert(data);
									$('#part_man_power').append(data);
									//$('#requestqty').val('');
								}
							})
						})
						function del_man_power(wo,id,start,finish){ //alert(finish);
							$('#part_man_power').empty(); 
							var id = id; 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/delete_man_power.php',
								data:{'wo':wo,'id':id,'start':start,'finish':finish},
								crossDomain:true,
								cache:false,
								beforeSend: function(){
									$('#load_tabel').show();
								},
								success:function(data){
									$('#load_tabel').hide();
									//alert(data);
									$('#part_man_power').append(data);
								}
							})
						}
						
					</script>
		";

	return $content;
}

function failure_analysis()
{
	$content = "<script>
						$('#fail_analisys').DataTable();
						
						$('#add_class').on('click',function(){
							$('#fail_analisys').empty();
							var temp_wo = $('#temp_wo').val(); 
							var item = $('#sp_class').val(); 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/list_eqclass.php',
								data:{'wo':temp_wo,'item':item},
								crossDomain:true,
								cache:false,
								success:function(data){
									//alert(data);
									$('#fail_analisys').append(data);
								}
							})
						})
						
						$('#eq_class').on('change',function(){
							$('#sp_class').empty();
							var cat = $('#eq_class').val();
							var temp_wo = $('#temp_wo').val(); 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_category_change.php',
								data:{'cat':cat,'wo':temp_wo},
								crossDomain:true,
								cache:false,
								success:function(data){
									//alert(data);
									$('#sp_class').append(data);
								}
							})
						})
						
						function del_eqclass(id){
							$('#fail_analisys').empty();
							var temp_wo = $('#temp_wo').val(); 
							var item = id; 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/delete_list_eqclass.php',
								data:{'wo':temp_wo,'item':item},
								crossDomain:true,
								cache:false,
								success:function(data){
									//alert(data);
									$('#fail_analisys').append(data);
								}
							})
						}
						
						$('#eq_flcode').on('change',function(){
							var flcode = $('#eq_flcode').val();
							var temp_wo = $('#temp_wo').val(); 
							$.ajax({
								type: 'POST',
								url:'" . _ROOT_ . "function/content/work_order/work_flcode_change.php',
								data:{'flcode':flcode,'wo':temp_wo},
								crossDomain:true,
								cache:false,
								success:function(data){
									alert(data);
								}
							})
						})
						
					</script>";
	return $content;
}

function add_wo()
{
	$content = "
				<script>
				
					$('#add1').click(function(){
						var html = '';
						html += '<div id=\"test2\">';
						html += '<input type=\"text\" id=\"cause_a\"  name=\"cause[]\" style=\"width:90%;height:40px;margin-top:2px;\">';
						html += '<a type=\"button\" class=\"btn btn-danger btn-xs\" id=\"remove\" title=\"Remove\" style=\"color:white;margin-left:2px;\"><i class=\"fa fa-trash fa-fw\"></i></a>'
						html += '</div>';
						$('#test2').append(html);
				});
				$(document).on('click', '#remove', function () {
					$(this).closest('#test2').remove();
				});

				$('#add2').click(function(){
					var html = '';
					html += '<div id=\"test_e\">';
					html += '<input type=\"text\" id=\"cause_e\"  name=\"cause_e[]\" style=\"width:90%;height:40px;margin-top:2px;\">';
					html += '<a type=\"button\" class=\"btn btn-danger btn-xs\" id=\"remove_e\" title=\"Remove\" style=\"color:white;margin-left:2px;\"><i class=\"fa fa-trash fa-fw\"></i></a>'
					html += '</div>';
					$('#parent_test_e').append(html);
			});
			$(document).on('click', '#remove_e', function () {
				$(this).closest('#test_e').remove();
			});
						
					$('#plant').on('change',function(){
						var plant = $('#plant').val();
						$('#asset').empty();
						$('#assdesc').empty();
						
						$.ajax({
							type: 'POST',
							url:'" . _ROOT_ . "function/content/work_order/work_plant_change.php',
							data:{'plant':plant},
							crossDomain:true,
							cache:false,
							success:function(data){
								//alert(data);
								$('#asset').append(data);
							}
						})
						
						$.ajax({
							type: 'POST',
							url:'" . _ROOT_ . "function/content/work_order/work_plant2_change.php',
							data:{'plant':plant},
							crossDomain:true,
							cache:false,
							success:function(data){
								//alert(data);
								$('#assdesc').append(data);
							}
						})
					})
					
					$('#asset').on('change',function(){
						var asset = $('#asset').val();
						var plant = $('#plant').val();
						$('#asset_desc').empty();
						//$('#assdesc').empty();
						
						$.ajax({
							type: 'POST',
							url:'" . _ROOT_ . "function/content/work_order/work_asset_desc.php',
							data:{'asset':asset,'plant':plant},
							crossDomain:true,
							cache:false,
							success:function(data){
								//alert(data);
								//$('#assdesc').append(data);
								$('#asset_desc').append(data);
							}
						})
					})

					$('#line').on('change',function(){
						var line = $('#line').val();
						var plant = $('#plant').val();
						$('#asset').empty();
						$('#assdesc').empty();
						$.ajax({
							type: 'POST',
							url:'" . _ROOT_ . "function/content/work_order/work_line_asset.php',
							data:{'line':line,'plant':plant},
							crossDomain:true,
							cache:false,
							success:function(data){
								$('#asset').append(data);
							}
						})
					})
					
					$('#assdesc').on('change',function(){
						var asset = $('#assdesc').val();
						var plant = $('#plant').val();
						//$('#asset_desc').empty();
						$('#asset').empty();
						
						$.ajax({
							type: 'POST',
							url:'" . _ROOT_ . "function/content/work_order/work_asset2_desc.php',
							data:{'asset':asset,'plant':plant},
							crossDomain:true,
							cache:false,
							success:function(data){
								//alert(data);
								$('#asset').append(data);
							}
						})
					})
				</script>
		";
	return $content;
}
